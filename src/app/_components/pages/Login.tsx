"use client";

import React, { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import Notify from "@utils/Notify";

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
    const { username, password } = data;

    console.log("DATA", data);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.ok) {
        console.log("Successful login");
      }

      if (res?.error) {
        Notify.error("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
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
