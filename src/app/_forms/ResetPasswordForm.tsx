import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

interface ResetPasswordFormProps {
  handleLoginMode: () => void;
}

interface ResetPasswordFormInputs {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .min(6, "Password must be at least 6 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  handleLoginMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: ResetPasswordFormInputs) => {
    //TODO: Update
    console.log("RESET PASSWORD FORM", data);
  };
  return (
    <form
      id="kt_password_reset_form"
      className="form w-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Reset Password</h1>
        <div className="text-gray-400 fw-bold fs-4">
          A verification code was sent to your email, please enter it below
          along with your new password.
        </div>
      </div>
      {errors.verificationCode && (
        <p className="text-danger">{errors.verificationCode.message}</p>
      )}
      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6">Code</label>
        <input
          className="form-control form-control-solid"
          type="text"
          placeholder="Verification Code"
          autoComplete="off"
          {...register("verificationCode")}
        />
      </div>
      {errors.password && (
        <p className="text-danger">{errors.password.message}</p>
      )}
      <div className="fv-row mb-10">
        <div className="d-flex flex-stack mb-2">
          <label className="form-label fw-bolder text-dark fs-6 mb-0">
            Password
          </label>
        </div>
        <input
          className="form-control form-control-lg form-control-solid"
          type="password"
          autoComplete="off"
          {...register("password")}
        />
      </div>
      {errors.confirmPassword && (
        <p className="text-danger">{errors.confirmPassword.message}</p>
      )}
      <div className="fv-row mb-10">
        <div className="d-flex flex-stack mb-2">
          <label className="form-label fw-bolder text-dark fs-6 mb-0">
            Confirm Password
          </label>
        </div>
        <input
          className="form-control form-control-lg form-control-solid"
          type="password"
          autoComplete="off"
          {...register("confirmPassword")}
        />
      </div>
      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          id="kt_password_reset_submit"
          type="submit"
          className="btn btn-lg btn-primary fw-bolder me-4"
        >
          {/* <span className="indicator-progress">
            Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span> */}
          <span className="indicator-label">Submit</span>
        </button>
        <a
          href="javascript:;"
          className="btn btn-lg btn-light-primary fw-bolder"
          onClick={handleLoginMode}
        >
          Cancel
        </a>
      </div>{" "}
    </form>
  );
};

export default ResetPasswordForm;
