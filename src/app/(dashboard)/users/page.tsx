"use client";

import dynamic from "next/dynamic";

import React, { useState } from "react";

import { NextPageWithLayout } from "@/_types/page";

const Users = dynamic(() => import("@components/tables/Users"), {
  ssr: false,
});

const UsersPage: NextPageWithLayout = () => {
  return <Users />;
};

export default UsersPage;
