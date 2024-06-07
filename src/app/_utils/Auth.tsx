import axios, { AxiosError } from "axios";

import { jwtDecode } from "jwt-decode";

import moment from "moment";

import AuthTokens from "./AuthTokens";

import { Api } from "@/_constants/Api";

interface Tokens {
  access?: string;
  refresh?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
}

let cachedRefreshToken: Promise<Tokens> | null = null;

const silentLogin = async (): Promise<any> => {
  try {
    const refreshToken = await AuthTokens.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    console.log("SILENT LOGIN REFRESH TOKEN", refreshToken);

    const updatedTokens = await refreshTokens(refreshToken as any);

    const accessToken = await AuthTokens.getAccessToken();

    AuthTokens.saveTokens(updatedTokens as any);

    const response = await axios.get(Api.User.Info, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("User Info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Silent login failed:", error);
    throw error;
  }
};

const refreshTokens = async (token: Tokens): Promise<Tokens> => {
  return getCachedRefreshToken(token).then((response) => {
    setTimeout(() => {
      cachedRefreshToken = null;
    }, 300);

    return response;
  });
};

const getCachedRefreshToken = (token: Tokens): Promise<Tokens> => {
  if (!cachedRefreshToken) {
    cachedRefreshToken = _refreshTokens(token);
  }

  return cachedRefreshToken;
};

const _refreshTokens = async (token: Tokens): Promise<Tokens> => {
  const refreshToken = await AuthTokens.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  console.log("REFRESH TOKEN", refreshToken);
  try {
    const response = await axios.post(
      Api.User.Refresh,
      {
        refresh: refreshToken,
      },
      { withCredentials: true }
    );

    console.log("RESPONSE REFRESH TOKENS", response);

    const updatedToken = {
      ...token,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
      accessTokenExpiresAt: getExpirationDate(response.data.access),
      refreshTokenExpiresAt: getExpirationDate(response.data.refresh),
    };
    console.log("UPDATED TOKEN", updatedToken);

    return updatedToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", (error as AxiosError).message);
    }

    throw new Error("Failed to refresh token");
  }
};

const getExpirationDate = (token: string | undefined): string => {
  if (!token) return "";

  const decodedJWT = jwtDecode(token) as { exp: number };
  const exp = decodedJWT.exp * 1000;
  const expirationTime = moment(exp);
  return expirationTime.toISOString();
};

const getMinutesUntilTokenExpiration = (accessToken: string): number => {
  const decodedJWT = jwtDecode(accessToken) as { exp: number };
  const exp = decodedJWT.exp * 1000;
  const expirationTime = moment(exp);
  const today = moment();
  return expirationTime.diff(today, "minutes");
};

const formatExpirationTime = (remainingMinutes: number): string => {
  const currentTime = moment();
  const expirationTime = currentTime.clone().add(remainingMinutes, "minutes");
  const formattedExpirationTime: string = expirationTime.toISOString();

  return formattedExpirationTime;
};

const Auth = {
  silentLogin,
  refreshTokens,
  getMinutesUntilTokenExpiration,
  formatExpirationTime,
};

export default Auth;
