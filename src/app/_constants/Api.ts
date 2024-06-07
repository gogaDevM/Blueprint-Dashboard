const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export const Api = {
  Base: apiBase,
  // User: {
  //   Login: `${apiBase}/auth/login`,
  //   Logout: `${apiBase}/auth/logout`,
  //   Refresh: `${apiBase}/auth/refresh`,
  //   ForgotPassword: `${apiBase}/auth/forgot-password`,
  //   ResetPassword: `${apiBase}/auth/reset-password`,
  // },
  User: {
    Login: `${apiBase}/user/login`,
    Logout: `${apiBase}/user/logout`,
    ForgotPassword: `${apiBase}/user/request-reset-password`,
    ResetPassword: `${apiBase}/user/reset-password`,
    Refresh: `${apiBase}/user/login/refresh`,
    Info: `${apiBase}/user/info`,
  },
  Users: `${apiBase}/users`,
  Posts: `${apiBase}/posts`,
};
