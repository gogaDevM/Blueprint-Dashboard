import axios, { AxiosError } from "axios";

import moment from "moment";

import Auth from "./Auth";

import Notify from "./Notify";

import { AuthenticatedSession } from "../_types/Types";

interface DeleteDataProps {
  data: any;
  isLoading: boolean;
  error: any | null;
}

interface Headers {
  Authorization: string;
}

const deleteData = async (
  url: string,
  session: AuthenticatedSession
): Promise<DeleteDataProps> => {
  let data: any = null;
  let isLoading: boolean = false;
  let error: any | null = null;

  try {
    isLoading = true;

    const accessTokenExpired = session?.accessTokenExpiresAt;

    if (!session) {
      return { data: null, isLoading: false, error: null };
    }

    const accessTokenExpiryTime = moment(accessTokenExpired);
    const currentTime = moment(new Date());
    const differenceInMinutes = accessTokenExpiryTime.diff(
      currentTime,
      "minutes"
    );

    if (differenceInMinutes && differenceInMinutes < 1) {
      try {
        await Auth.refreshTokens({
          refresh: session.refreshToken!,
        });
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await axios.delete(url, {
      withCredentials: true,
      headers,
    });

    data = response.data;
  } catch (error: any) {
    const errorMessage = error.response.data.detail;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      error = {
        message: axiosError.message,
        statusCode: axiosError.response?.status,
      };

      Notify.error(errorMessage);
    } else {
      error = error;
      console.log("ERROR DELETING DATA", error);
    }
  } finally {
    isLoading = false;
  }

  return { data, isLoading, error };
};

export default deleteData;
