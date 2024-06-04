import React, { useState } from "react";

import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

import axios from "axios";

import { Api } from "@/_constants/Api";

interface ForgotPasswordFormProps {
  handleLoginMode: () => void;
}

interface ForgotPasswordFormInputs {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  handleLoginMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const { data: session } = useSession();

  const postData = async (url: string, data: any) => {
    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      const url = Api.User.ForgotPassword;
      const postDataResponse = await postData(url, data);

      if (postDataResponse) {
        console.log("Forgot Password: Succes");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form
      id="kt_password_reset_form"
      className="form w-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Forgot Password ?</h1>
        <div className="text-gray-400 fw-bold fs-4">
          Enter your email to reset your password.
        </div>
      </div>
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
        <input
          className="form-control form-control-solid"
          type="email"
          placeholder=""
          autoComplete="off"
          {...register("email")}
        />
      </div>
      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          id="kt_password_reset_submit"
          type="submit"
          className="btn btn-lg btn-primary fw-bolder me-4"
        >
          <span className="indicator-label">Submit</span>
        </button>
        <a
          href="javascript:;"
          className="btn btn-lg btn-light-primary fw-bolder"
          onClick={handleLoginMode}
        >
          Cancel
        </a>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
