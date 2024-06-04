"use client";

import React, { ReactNode, useEffect } from "react";

import useScripts from "@/_hooks/useScripts";

import { ToastContainer, toast } from "react-toastify";

export interface CustomLayoutProps {
  children: ReactNode;
}

const Layout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Layout;
