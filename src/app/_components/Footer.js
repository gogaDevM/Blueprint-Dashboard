import React from "react";

import moment from "moment";

const Footer = () => {
  const currentYear = moment().format("YYYY");

  return (
    <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div
          className="footer bg-white py-4 d-flex flex-lg-column"
          id="kt_footer"
        >
          <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="text-dark order-2 order-md-1">
              <span className="text-muted font-weight-bold mr-2">
                {currentYear}©
              </span>
              <a
                href="javascript:;"
                className="text-dark-75 text-hover-primary"
              >
                Blueprint
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
