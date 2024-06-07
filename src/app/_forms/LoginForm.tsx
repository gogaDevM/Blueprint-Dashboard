import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

import { LoginFormInputs } from "@/_types/Types";

interface LoginFormProps {
  handleSubmit: (data: LoginFormInputs) => void;
  handleForgotPasswordMode: () => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  //TODO: Update
  // .min(6, "Password must be at least 6 characters")
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleForgotPasswordMode,
}) => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data: LoginFormInputs) => {
    handleSubmit(data);
  };

  return (
    <form
      id="kt_sign_in_form"
      className="form w-100"
      onSubmit={onSubmit(onSubmitHandler)}
    >
      <div className="text-center mb-10">
        <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
          Blueprint
        </h3>
      </div>
      {errors.username && (
        <div className="text-danger text-sm py-1 px-3 rounded-md mt-2">
          {errors.username.message}
        </div>
      )}
      <div className="fv-row mb-10">
        <label className="font-size-h6 font-weight-bolder text-dark">
          Email
        </label>
        <input
          className="form-control form-control-lg form-control-solid"
          type="text"
          autoComplete="off"
          {...register("email")}
        />
      </div>
      {errors.password && (
        <div className="text-danger text-sm py-1 px-3 rounded-md mt-2">
          {errors.password.message}
        </div>
      )}
      <div className="fv-row mb-10">
        <div className="d-flex justify-content-between mt-n5">
          <label className="font-size-h6 font-weight-bolder text-dark">
            Password
          </label>
          <a
            href="javascript:;"
            className="text-primary font-size-h6 font-weight-bolder text-hover-primary "
            onClick={handleForgotPasswordMode}
          >
            Forgot Password ?
          </a>
        </div>
        <input
          className="form-control form-control-lg form-control-solid"
          type="password"
          autoComplete="off"
          {...register("password")}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 w-100"
        >
          <span className="indicator-label">Sign In</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
