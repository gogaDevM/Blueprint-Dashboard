import axios from "axios";

import mem from "mem";

import { CONFIG, OPEN_ENDPOINTS } from "./Constants";

import { removeAuthTokenExp } from "./Helpers";

import { parseResponseError } from "./FetchHelper";

const getAccessToken = () => {
  if (typeof window !== "undefined" && localStorage) {
    const accessToken = localStorage.getItem(
      CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN
    );
    return accessToken;
  }
  return null;
};
/**
 * Memoized function to refresh the access token using a refresh token stored in local storage.
 * It retrieves a new access token and refresh token from the API and updates the local storage with the new tokens.
 * If the refresh token request fails, it throws an error with the generated error message and status code.
 *
 * @function
 * @async
 *
 * @returns {Promise<Object>} The response data containing the new access and refresh tokens.
 *
 * @throws {Object} Throws an object containing an error with the generated error message and the status code.
 *
 *
 */

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
