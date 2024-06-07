import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import Notify from "./Notify";

import { CONFIG } from "./Constants";

export const getStoredAuthTokenExp = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(CONFIG.AUTH_TOKEN_EXP);
  }
  return null;
};

export const storeAuthTokenExp = (token: string) => {
  localStorage.setItem(CONFIG.AUTH_TOKEN_EXP, token);
};

export const removeAuthTokenExp = () => {
  localStorage.removeItem(CONFIG.AUTH_TOKEN_EXP);
  localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN);
  localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iterateObject(obj: Record<string, any>): string {
  let errorMessage: string = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((msg) => {
          if (typeof msg === "string") {
            errorMessage +=
              key[0].toUpperCase() + key.slice(1) + " " + msg + "\n";
          } else if (Array.isArray(msg) && typeof msg[0] === "string") {
            errorMessage +=
              key[0].toUpperCase() + key.slice(1) + " " + msg[0] + "\n";
          } else if (typeof msg === "object") {
            errorMessage += iterateObject(msg);
          }
        });
      } else if (typeof value === "object") {
        errorMessage += iterateObject(value);
      } else if (typeof value === "string") {
        errorMessage += value + "\n";
      }
    }
  }
  return errorMessage;
}

export const handleSignOut = async (
  routerInstance: AppRouterInstance,
  redirectUrl = "/"
) => {
  try {
    // no need to call API to logout because we are not using cookies anymore
    // just clearing the access and refresh token from local storage is enough

    // const refreshToken = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN)
    // const data = {
    //     refresh: refreshToken,
    // }
    // await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGOUT, data)
    removeAuthTokenExp();
    // signOut({ redirect: false })
  } catch (error: any) {
    Notify.error(error);
  } finally {
    routerInstance.push(
      `/auth/signin?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${redirectUrl}`
    );
  }
};
