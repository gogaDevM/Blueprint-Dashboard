"use client";

import React, { ReactNode, useEffect } from "react";

import useScripts from "@/_hooks/useScripts";

import { ToastContainer, toast } from "react-toastify";

import UnauthenticatedRoute from "@/_components/common/UnauthenticatedRoute";

export interface CustomLayoutProps {
  children: ReactNode;
}

const Layout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <UnauthenticatedRoute>
      {children}
      <ToastContainer />
    </UnauthenticatedRoute>
  );
};

export default Layout;
