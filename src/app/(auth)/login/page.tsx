"use client";

import dynamic from "next/dynamic";

import React, { useState } from "react";

import { NextPageWithLayout } from "@/_types/page";

const Login = dynamic(() => import("@components/pages/Login"), {
  ssr: false,
});

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

export default LoginPage;
