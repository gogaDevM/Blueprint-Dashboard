"use client";

import Link from "next/link";

import React from "react";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

interface Link {
  url: string;
  title: string;
  icon: JSX.Element;
}

interface Section {
  title?: string;
  type?: string;
  icon?: any;
  links: Link[];
}

interface LeftMenuProps {
  SECTIONS: any[];
}

const LINK_DASHBOARD = {
  title: "Dashboard",
  icon: (
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon id="Bound" points="0 0 24 0 24 24 0 24" />
      <path
        d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z"
        id="Shape"
        fill="#000000"
        fillRule="nonzero"
      />
      <path
        d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z"
        id="Path"
        fill="#000000"
        opacity="0.3"
      />
    </g>
  ),
  url: "/",
};

const LINK_USERS = {
  title: "Users",
  icon: (
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <polygon points="0 0 24 0 24 24 0 24" />
      <path
        d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
        fill="#000000"
        fill-rule="nonzero"
        opacity="0.3"
      />
      <path
        d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
        fill="#000000"
        fill-rule="nonzero"
      />
    </g>
  ),
  url: "/users",
};

const SECTIONS: any = [
  {
    title: "",
    links: [LINK_DASHBOARD],
  },
  ,
  {
    title: "Users",
    links: [LINK_USERS],
  },
];

const renderSections = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <div
        className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
        id="#kt_aside_menu"
        data-kt-menu="true"
      >
        {SECTIONS.map((section: Section) => {
          return (
            <React.Fragment key={section.title}>
              {section.title && (
                <>
                  <div className="menu-item">
                    <div className="menu-content pt-8 pb-2">
                      <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                        {section.title}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {section.type === "menu" && (
                <>
                  <div
                    data-kt-menu-trigger="click"
                    className="menu-item menu-accordion "
                  >
                    <span className="menu-link">
                      <span className="menu-icon">
                        <span className="svg-icon svg-icon-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {section.icon}
                          </svg>
                        </span>
                      </span>
                      <span className="menu-title">Declarations</span>
                      <span className="menu-arrow"></span>
                    </span>
                    <div className="menu-sub menu-sub-accordion menu-active-bg ">
                      {section.links.map((link) => {
                        return (
                          <div className="menu-item" key={link.title}>
                            <a
                              className="menu-link"
                              onClick={() => handleClick(link.url)}
                            >
                              <span className="menu-bullet">
                                <span className="bullet bullet-dot"></span>
                              </span>
                              <span className="menu-title">{link.title}</span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {section.type !== "menu" &&
                section.links.map((link: Link) => {
                  let className = "menu-link";
                  if (link.url === pathname) {
                    className += " active";
                  }
                  return (
                    <div className="menu-item" key={link.title}>
                      <a
                        className={className}
                        onClick={() => handleClick(link.url)}
                      >
                        <span className="menu-icon">
                          <span className="svg-icon svg-icon-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              {link.icon}
                            </svg>
                          </span>
                        </span>
                        <span className="menu-title">{link.title}</span>
                      </a>
                    </div>
                  );
                })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

const LeftMenu: React.FC<LeftMenuProps> = () => {
  return (
    <div
      id="kt_aside"
      className="aside aside-light aside-hoverable"
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_mobile_toggle"
    >
      <div className="aside-logo flex-column-auto" id="kt_aside_logo">
        <Link href="/">
          <img
            src="/assets/media/logos/blueprint-logo.png"
            className="h-100px logo"
            alt="Logo"
          />
        </Link>
        <div
          id="kt_aside_toggle"
          className="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
          data-kt-toggle="true"
          data-kt-toggle-state="active"
          data-kt-toggle-target="body"
          data-kt-toggle-name="aside-minimize"
        >
          <span className="svg-icon svg-icon-1 rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                opacity="0.5"
                d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                fill="black"
              ></path>
              <path
                d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                fill="black"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="aside-menu flex-column-fluid">
        <div
          className="hover-scroll-overlay-y my-5 my-lg-5"
          id="kt_aside_menu_wrapper"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
          data-kt-scroll-wrappers="#kt_aside_menu"
          data-kt-scroll-offset="0"
          style={{ height: 930 }}
        >
          {renderSections()}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
