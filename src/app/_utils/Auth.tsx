import axios, { AxiosError } from "axios";

import { jwtDecode } from "jwt-decode";

import moment from "moment";

import { Api } from "@/_constants/Api";

interface Tokens {
  access?: string;
  refresh?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
}

let cachedRefreshToken: Promise<Tokens> | null = null;

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
  try {
    const response = await axios.post(
      Api.User.Refresh,
      {
        refresh: token.refresh,
      },
      { withCredentials: true }
    );

    const updatedToken = {
      ...token,
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
      accessTokenExpiresAt: getExpirationDate(response.data.access),
      refreshTokenExpiresAt: getExpirationDate(response.data.refresh),
    };

    console.log("Access Token Expires At", updatedToken.accessTokenExpiresAt)

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
  refreshTokens,
  getMinutesUntilTokenExpiration,
  formatExpirationTime,
};

export default Auth;