import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next";

import type { NextAuthOptions } from "next-auth";

import CredentialsProviders from "next-auth/providers/credentials";

import { cookies } from "next/headers";

import { Api } from "@/_constants/Api";

import Auth from "@utils/Auth";

import Cookies from "@utils/Cookies";

import { User } from "@/_types/Types";

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

export const options: NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    providers: [
      CredentialsProviders({
        name: "Credentials",
        credentials: {},
        async authorize(credentials): Promise<any | null> {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };
          try {
            const response = await axios.post(
              Api.User.Login,
              {
                username,
                password,
              },
              {
                withCredentials: true,
              }
            );

            console.log("RES", response);

            const responseCookies = response.headers["set-cookie"];

            const parsedCookies = Cookies.parseCookies(responseCookies);

            const accessTokenCookie: any = Cookies.findCookie(
              parsedCookies,
              "X-Auth-Access-Token"
            );
            const refreshTokenCookie: any = Cookies.findCookie(
              parsedCookies,
              "X-Auth-Refresh-Token"
            );

            try {
              cookies().set({
                name: accessTokenCookie.name,
                value: accessTokenCookie.value,
                path: accessTokenCookie.path,
                maxAge: accessTokenCookie.maxAge,
                expires: accessTokenCookie.expires,
                httpOnly: true,
                sameSite: "none",
                secure: true,
              });

              cookies().set({
                name: refreshTokenCookie.name,
                value: refreshTokenCookie.value,
                path: refreshTokenCookie.path,
                maxAge: refreshTokenCookie.maxAge,
                expires: refreshTokenCookie.expires,
                httpOnly: true,
                sameSite: "none",
                secure: true,
              });
            } catch (error) {
              console.log("ERROR: Cookies", error);
            }

            const responseData = response.data;

            console.log("LLLL", responseData);

            if (response.data.token) {
              return responseData;
            } else {
              console.error("Unexpected response format from the server");
              return null;
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.message);
            }

            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, session }) {
        if (user) {
          // const {
          //   tokens: { access: accessToken, refresh: refreshToken },
          //   ...userData
          // } = user as User;

          // token.accessToken = accessToken || "";
          // token.refreshToken = refreshToken || "";
          // token.userData = userData;
          token.accessToken = (user as User).token || "";
          token.refreshToken = (user as User).token || "";
          token.userData = user;
        }

        let typedToken = token as {
          accessToken?: string;
          refreshToken?: string;
          accessTokenExpiresAt?: string;
          refreshTokenExpiresAt?: string;
          userData?: any;
          error?: string | undefined;
        };

        let remainingMinutes = Auth.getMinutesUntilTokenExpiration(
          typedToken.accessToken!
        );

        typedToken.accessTokenExpiresAt =
          Auth.formatExpirationTime(remainingMinutes);

        if (remainingMinutes > 1) {
          return Promise.resolve(typedToken);
        }
        typedToken = await Auth.refreshTokens(typedToken);

        return Promise.resolve(typedToken);
      },
      async session({
        token,
        user,
        session,
      }: {
        token: any;
        user: any;
        session?: any;
      }) {
        // const { tokens, ...data } = token.userData;

        const { accessToken, refreshToken, ...userData } = token.userData;

        let remainingMinutes = Auth.getMinutesUntilTokenExpiration(
          token.refreshToken
        );

        token.refreshTokenExpiresAt =
          Auth.formatExpirationTime(remainingMinutes);

        const sessionData: any = {
          customer: userData,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          error: token.error,
        };

        delete session.user;

        console.log("SESSION DATA", sessionData);

        return Promise.resolve(sessionData);
      },
    },
    session: {
      strategy: "jwt",
    },
    // events: {
    //   async signOut() {
    //   },
    // },
    secret: process.env.NEXTAUTH_SECRET,
  };
};
