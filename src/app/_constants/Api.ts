const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export const Api = {
  Base: apiBase,
  User: {
    Login: `${apiBase}/user/login`,
    Logout: `${apiBase}/user/logout`,
    RequestResetPassword: `${apiBase}/user/request-reset-password`,
    ResetPassword: `${apiBase}/user/reset-password`,
    Refresh: `${apiBase}/user/refresh-token`,
    Info: `${apiBase}/user/info`,
  },
  Users: `${apiBase}/users`,
  Posts: `${apiBase}/posts`,
};
