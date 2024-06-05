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
    <div
      className="aside-menu-wrapper flex-column-fluid"
      id="kt_aside_menu_wrapper"
    >
      <div
        id="kt_aside_menu"
        className="aside-menu my-4"
        data-ktmenu-vertical="1"
        data-ktmenu-scroll="1"
        data-ktmenu-dropdown-timeout="500"
      >
        <ul className="menu-nav">
          {SECTIONS.map((section: Section) => {
            return (
              <React.Fragment key={section.title}>
                {section.title && (
                  <div className="menu-item">
                    <div className="menu-content pt-8 pb-2">
                      <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                        {section.title}
                      </span>
                    </div>
                  </div>
                )}

                {section.links.map((link: Link) => {
                  let className = "menu-link";
                  if (link.url === pathname) {
                    className += " active";
                  }
                  return (
                    <li className="menu-item">
                      <a
                        className={className}
                        onClick={() => handleClick(link.url)}
                      >
                        <span className="svg-icon menu-icon">
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
                        <span className="menu-text">{link.title}</span>
                      </a>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const LeftMenu: React.FC<LeftMenuProps> = () => {
  return (
    <div
      className="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
      id="kt_aside"
    >
      <div
        className="brand flex-column-auto my-14"
        id="kt_brand"
        kt-hidden-height="65"
      >
        <Link href="/">
          <img
            alt="Logo"
            src="/assets/media/logos/blueprint-logo.png"
            className="h-100px"
          />
        </Link>
        <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
          <span className="svg-icon svg-icon svg-icon-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                <path
                  d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                  fill="#000000"
                  fillRule="nonzero"
                  transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)"
                ></path>
                <path
                  d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                  fill="#000000"
                  fillRule="nonzero"
                  opacity="0.3"
                  transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)"
                ></path>
              </g>
            </svg>
          </span>
        </button>
      </div>

      {renderSections()}
    </div>
  );
};

export default LeftMenu;
