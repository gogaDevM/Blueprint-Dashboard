import axios, { AxiosError, Method } from "axios";

import moment from "moment";

import Auth from "./Auth";

import { AuthenticatedSession } from "../_types/Types";

import Notify from "./Notify";

interface modifyDataProps {
  data: any;
  isLoading: boolean;
  error: any | null;
}

interface modifyDataOptions {
  method: Method;
  url: string;
  session: AuthenticatedSession;
  requestData: any;
}

const modifyData = async ({
  method,
  url,
  session,
  requestData,
}: modifyDataOptions): Promise<modifyDataProps> => {
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
      headers.Authorization = `Bearer ${session.accessToken} `;
    }

    const response = await axios.request({
      method,
      url,
      data: requestData,
      withCredentials: true,
      headers,
    });

    data = response.data;
  } catch (error) {
    Notify.error((error as any).message);
  } finally {
    isLoading = false;
  }

  return { data, isLoading, error };
};

export default modifyData;
