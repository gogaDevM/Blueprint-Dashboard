import axios from "axios";

import { Api } from "@/_constants/Api";

import { AuthenticatedSession } from "@/_types/Types";

interface CustomFile extends File {
  id?: number;
  file: File;
  height?: any;
  width?: number;
  token?: string;
}

const getPresignedUploadUrl = async (
  file: CustomFile,
  session: AuthenticatedSession
) => {
  try {
    let data: any = {
      name: file.name,
      height: file?.height || 100,
      width: file?.width || 100,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken} `;
    }

    const requestOptions = {
      withCredentials: true,
      headers,
    };

    const url = Api.Images;

    const response = await axios.post(url, data, requestOptions);

    return response.data;
  } catch (error) {
    throw new Error("Failed to get presigned upload URL");
  }
};

const markFileUploaded = async (
  file: CustomFile,
  token: string,
  session: AuthenticatedSession
) => {
  try {
    const endpoint = Api.Images;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken} `;
    }

    const requestOptions = {
      withCredentials: true,
      headers,
    };

    await axios.patch(
      `${endpoint}/${file.id}`,
      { token: file.token, uploaded: true },
      requestOptions
    );
  } catch (error) {
    throw new Error("Failed to mark file as uploaded");
  }
};

export const uploadFile = async (
  localFile: File,
  session: AuthenticatedSession
) => {
  let file: any = null;

  try {
    const response = await getPresignedUploadUrl(
      localFile as CustomFile,
      session
    );

    file = response.image;

    const url = response.pre_signed_url;

    await axios.put(url, localFile);

    if (file.id as number) {
      markFileUploaded(file, file.token, session);
    }

    return file;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};
