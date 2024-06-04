"use client";

import React, { ReactNode, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import useScripts from "@/_hooks/useScripts";

import LeftMenu from "@/_components/LeftMenu";

import Header from "@components/Header";
import Footer from "@components/Footer";

export interface CustomLayoutProps {
  children: ReactNode;
}

const Layout: React.FC<CustomLayoutProps> = ({ children }) => {
  const scriptUrls = [
    "/assets/plugins/global/plugins.bundle.js",
    "/assets/plugins/custom/prismjs/prismjs.bundle.js",
    "/assets/js/scripts.bundle.js",
    "/assets/js/custom.js",
  ];

  useScripts({ scriptUrls });

  const SECTIONS: any[] = [];

  return (
    <>
      {/* <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid"> */}
          <LeftMenu SECTIONS={SECTIONS} />
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <Header />
            <div
              className="content d-flex flex-column flex-column-fluid"
              id="kt_content"
            >
              <div className="post d-flex flex-column-fluid" id="kt_">
                <div id="kt_content_container" className="container-xxl">
                  {children}
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <ToastContainer />
        {/* </div>
      </div> */}
    </>
  );
};

export default Layout;
