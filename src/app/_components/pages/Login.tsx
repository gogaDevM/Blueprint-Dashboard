"use client";

import React, { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { Api } from "@/_constants/Api";

import Notify from "@utils/Notify";
import AuthTokens from "@/_utils/AuthTokens";

import LoginForm from "@forms/LoginForm";
import ForgotPasswordForm from "@forms/ForgotPasswordForm";
import ResetPasswordForm from "@forms/ResetPasswordForm";

import { LoginFormInputs } from "@/_types/Types";

interface LoginProps {}

const MODE_LOGIN = "signup";
const MODE_FORGOT_PASSWORD = "forgot_password";
const MODE_RESET_PASSWORD = "reset_password";

const Login: React.FC<LoginProps> = () => {
  const [mode, setMode] = useState(MODE_LOGIN);

  const router = useRouter();

  const handleSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;

    try {
      const res = await axios.post(Api.User.Login, { email, password });

      console.log("res", res.data.tokens);

      const { access, refresh } = res.data.tokens;

      if (res.status === 200) {
        AuthTokens.saveTokens({
          accessToken: access,
          refreshToken: refresh,
        });

        console.log("Successful login");

        router.replace("/");
      } else {
        Notify.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      Notify.error("An error occurred during login");
    }
  };

  const handleLoginMode = () => {
    setMode(MODE_LOGIN);
  };

  const handleForgotPasswordMode = () => {
    setMode(MODE_FORGOT_PASSWORD);
  };

  return (
    <div
      className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      id="kt_login"
    >
      <div
        className="login-aside d-flex flex-column flex-row-auto"
        style={{ backgroundColor: "#2d97fb" }}
      >
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15 pl-25 pr-25 text-center">
          <a href="javascript:;" className="mb-10"></a>
        </div>
      </div>
      <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto my-auto">
        {mode === MODE_LOGIN && (
          <LoginForm
            handleSubmit={handleSubmit}
            handleForgotPasswordMode={handleForgotPasswordMode}
          />
        )}

        {mode === MODE_FORGOT_PASSWORD && (
          <ForgotPasswordForm handleLoginMode={handleLoginMode} />
        )}

        {mode === MODE_RESET_PASSWORD && (
          <ResetPasswordForm handleLoginMode={handleLoginMode} />
        )}
      </div>
    </div>
  );
};

export default Login;
