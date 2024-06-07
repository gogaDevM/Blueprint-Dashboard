const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const AuthTokens = {
  saveTokens: (tokens: Tokens): Promise<void> => {
    return Promise.resolve().then(() => {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    });
  },

  getAccessToken: (): Promise<string | null> => {
    return Promise.resolve().then(() => {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    });
  },

  getRefreshToken: (): Promise<string | null> => {
    return Promise.resolve().then(() => {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    });
  },

  clearTokens: (): Promise<void> => {
    return Promise.resolve().then(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    });
  },
};

export default AuthTokens;

// const ACCESS_TOKEN_KEY = "access_token";
// const REFRESH_TOKEN_KEY = "refresh_token";

// interface Tokens {
//   accessToken: string;
//   refreshToken: string;
// }

// const AuthTokens = {
//   saveTokens: (tokens: Tokens): void => {
//     localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
//     localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
//   },

//   getAccessToken: (): string | null => {
//     return localStorage.getItem(ACCESS_TOKEN_KEY);
//   },

//   getRefreshToken: (): string | null => {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   },

//   clearTokens: (): void => {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   },
// };

// export default AuthTokens;
