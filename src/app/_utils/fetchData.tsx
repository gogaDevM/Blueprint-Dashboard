import axios, { AxiosError } from "axios";

import moment from "moment";

import Auth from "./Auth";

import { AuthenticatedSession } from "../_types/Types";

const params = {};

interface FetchDataProps {
  data: any;
  isLoading: boolean;
  error: any | null;
}

interface Headers {
  Authorization: string;
}

const fetchData = async (
  url: string,
  session: AuthenticatedSession
): Promise<FetchDataProps> => {
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

    const response = await axios.get(url, {
      withCredentials: true,
      headers,
      params,
    });

    data = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      error = {
        message: axiosError.message,
        statusCode: axiosError.response?.status,
      };
    } else {
      error = error;
      console.log("ERROR", error);
    }
  } finally {
    isLoading = false;
  }

  return { data, isLoading, error };
};

export default fetchData;
