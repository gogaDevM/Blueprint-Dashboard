import { useEffect, useState } from "react";

import axios, { AxiosError } from "axios";

import moment from "moment";

import { Session } from "next-auth";

import { useSession } from "next-auth/react";

import Auth from "@utils/Auth";

import { AuthenticatedSession } from "../_types/Types";

interface FetchDataProps {
  data: any;
  loading: boolean;
  error: any | null;
}

const useFetchData = (
  url: string,
  session: AuthenticatedSession | null,
): FetchDataProps => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const accessTokenExpired = session?.accessTokenExpiresAt;

        if (!session) {
          return;
        }

        const accessTokenExpiryTime = moment(accessTokenExpired);

        const currentTime = moment(new Date());

        let differenceInMinutes = accessTokenExpiryTime.diff(
          currentTime,
          "minutes"
        );


        if (differenceInMinutes && differenceInMinutes < 1) {
          console.log(
            "Session expired or will expire soon. Refreshing token..."
          );
          try {
            await Auth.refreshTokens({
              refresh: session.refreshToken!,
            });

            console.log("Token refreshed successfully.");
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
          }
        }

        const response = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("RESPONSE in useFETCHData", response);

        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          setError({
            message: axiosError.message,
            statusCode: axiosError.response?.status,
          });
        } else {
          setError(error);
          console.log("ERROR", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData()

    // if (session) {
    //   fetchData();
    // }
  }, [url, session]);

  return { data, loading, error };
};

export default useFetchData;
