"use client";

import React from "react";

const Styles: React.FC = () => {
  return (
    <>
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={`/images/favicon.ico`}
      />

      <link
        rel="stylesheet"
        href={`./assets/css/metronic-7.0.2/pages/login/login-1.css`}
      />

      <link rel="stylesheet" href={`/assets/css/style.bundle.css`} />
      {/* <link
        rel="stylesheet"
        href={`/assets/plugins/global/plugins.bundle.css`}
      /> */}
      <link
        rel="stylesheet"
        href={`/assets/css/themes/layout/header/base/light.css`}
      />
      <link
        rel="stylesheet"
        href={`/assets/css/themes/layout/header/menu/light.css`}
      />
          <link
        rel="stylesheet"
        href={`/assets/css/themes/layout/brand/light.css`}
      />
      <link
        rel="stylesheet"
        href={`/assets/css/themes/layout/aside/light.css`}
      />
      <link rel="stylesheet" href={`/assets/css/style.bundle-7.0.2.css`} />
      <link rel="stylesheet" href={`/assets/css/custom.css`} />
      <link rel="stylesheet" href={`/assets/css/wizard-2.css`} />
      <link rel="stylesheet" href={`/assets/scss/app.scss`} />
    </>
  );
};

export default Styles;
