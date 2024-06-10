import jwtDecode from "jwt-decode";

import moment from "moment";

import AsyncStorage from "./AsyncStorage";

import FetchHelper from "./FetchHelper";

import { Api } from "@/_constants/Api";

interface User {
  role: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface ResponseJson {
  tokens: Tokens;
  admin?: User;
  associate?: User;
  ephemeral_token?: string;
  message?: string;
  email?: string[];
  non_field_errors?: string[];
  detail?: string;
}

const KEY_ACCESS_TOKEN = "accessToken";
const KEY_REFRESH_TOKEN = "refreshToken";

const AuthManager = {
  isLoggedIn: false,
  accessToken: null as string | null,
  refreshToken: null as string | null,
  currentUser: null as User | null,
  cachedValidateTokensFunction: null as Promise<void> | null,

  isAuthenticated() {
    return AuthManager.isLoggedIn;
  },

  getAccessToken() {
    return AuthManager.accessToken;
  },

  getCurrentUser() {
    return AuthManager.currentUser;
  },

  hasError(responseJson: ResponseJson) {
    const tokens = responseJson.tokens;
    return !tokens || !tokens.access || !tokens.refresh;
  },

  _handleLoginResponse(responseJson: ResponseJson) {
    return new Promise<void>((resolve, reject) => {
      //   if (responseJson.ephemeral_token) {
      //     throw responseJson;
      //   }

      console.log("RESPONSE", responseJson);

      //   if (AuthManager.hasError(responseJson)) {
      //     throw AuthManager.getError(responseJson);
      //   }

      //   if (!responseJson.admin) {
      //     throw {
      //       error: "invalid user",
      //       message: "Only splink admins / partners can access this",
      //     };
      //   }

      //   AuthManager._updateTokens(responseJson.tokens);
      // AuthManager._setUser(responseJson);

      resolve();
    });
  },

  _getMinutesUntilTokenExpiration() {
    var decodedJWT = jwtDecode(AuthManager.accessToken);
    const exp = decodedJWT.exp * 1000;
    const expirationTime = moment(exp);
    const today = moment();
    return expirationTime.diff(today, "minutes");
  },

  _validateTokens() {
    const remainingMinutes = AuthManager._getMinutesUntilTokenExpiration();

    if (remainingMinutes > 1) {
      setTimeout(() => {
        AuthManager.clearCachedValidateTokensFunction();
      }, 300);

      return Promise.resolve();
    }

    return AuthManager.refreshTokens()
      .then(() => {
        AuthManager.clearCachedValidateTokensFunction();
        return Promise.resolve();
      })
      .catch((error) => {
        AuthManager.clearCachedValidateTokensFunction();
        window.location.href = "/login";
      });
  },

  validateTokens() {
    return AuthManager.getCachedValidateTokensFunction();
  },

  refreshTokens() {
    return AsyncStorage.getItem(KEY_REFRESH_TOKEN)
      .then((refreshToken) => {
        if (!refreshToken) {
          throw { message: "No Refresh Token Found" };
        }

        const data = { refresh: refreshToken };
        return FetchHelper.post(Api.User.Refresh, data, false, false);
      })
      .then((tokenResponse) => {
        return AuthManager._updateTokens(tokenResponse);
      });
  },

  silentLogin() {
    return AuthManager.refreshTokens()
      .then(() => {
        return FetchHelper.get(Api.User.Info);
      })
      .then((responseJson) => {
        console.log("RESPONSE USER INFO", responseJson);
        AuthManager._setUser(responseJson);
        return AuthManager.currentUser;
      })
      .catch((error) => {
        AuthManager.accessToken = null;
        AuthManager.refreshToken = null;
        throw error;
      });
  },

  login(email: string, password: string) {
    const data = { email, password };

    return FetchHelper.post(Api.User.Login, data, false, false)
      .then((responseJson) => {
        console.log("RES LOGIN", responseJson);
        return AuthManager._handleLoginResponse(responseJson);
      })
      .catch((error) => {
        throw AuthManager.getError(error);
      });
  },

  logout() {
    const data = { refresh: this.refreshToken };
    return FetchHelper.post(Api.User.Logout, data).then(() => {
      return AuthManager.removeCredentials();
    });
  },

  requestResetPassword(email: string) {
    return FetchHelper.post(
      Api.User.RequestResetPassword,
      { email },
      false,
      false
    );
  },

  resetPassword(email: string, password: string, code: string) {
    const data = {
      email,
      password,
      verification_code: code,
    };
    return FetchHelper.post(Api.User.ResetPassword, data, false, false);
  },

  removeCredentials() {
    AuthManager.accessToken = null;
    AuthManager.refreshToken = null;
    AuthManager.isLoggedIn = false;
    AuthManager.currentUser = null;
    AsyncStorage.removeItem(KEY_ACCESS_TOKEN);
    return AsyncStorage.removeItem(KEY_REFRESH_TOKEN);
  },

  getError(error: any) {
    let errorMessage = "An unexpected error occurred";

    if (error.email) {
      errorMessage = error.email[0];
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.non_field_errors) {
      errorMessage = error.non_field_errors[0];
    } else if (error.detail) {
      errorMessage = error.detail;
    } else if (error.ephemeral_token) {
      errorMessage = error;
    }

    return { error: errorMessage, message: errorMessage };
  },

  _updateTokens(tokens: Tokens) {
    console.log("tokens", tokens);
    AuthManager.accessToken = tokens.access;
    AuthManager.refreshToken = tokens.refresh;
    AsyncStorage.setItem(KEY_ACCESS_TOKEN, tokens.access);
    AsyncStorage.setItem(KEY_REFRESH_TOKEN, tokens.refresh);
  },

  _setUser(responseJson: ResponseJson) {
    AuthManager.isLoggedIn = true;
    AuthManager.currentUser = AuthManager._getCurrentUser(responseJson);
  },

  _getCurrentUser(responseJson: ResponseJson) {
    if (responseJson.admin) {
      return responseJson.admin;
    }

    return null;
  },

  getHeaders(
    contentType: string = "application/json",
    authenticate: boolean = true
  ) {
    let headers: { [key: string]: string } = {};

    if (contentType === "application/json") {
      headers = { "Content-Type": contentType };
    }

    if (authenticate && AuthManager.accessToken) {
      headers["Authorization"] = "Bearer " + AuthManager.accessToken;
    }

    return new Headers(headers);
  },

  getCachedValidateTokensFunction() {
    if (!AuthManager.cachedValidateTokensFunction) {
      AuthManager.cachedValidateTokensFunction = AuthManager._validateTokens();
    }
    return AuthManager.cachedValidateTokensFunction;
  },

  clearCachedValidateTokensFunction() {
    AuthManager.cachedValidateTokensFunction = null;
  },
};

export default AuthManager;
