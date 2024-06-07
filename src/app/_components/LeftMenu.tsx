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
      <rect x="0" y="0" width="24" height="24"></rect>
      <path
        d="M5,19 L20,19 C20.5522847,19 21,19.4477153 21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 C4.55228475,3 5,3.44771525 5,4 L5,19 Z"
        fill="#000000"
        fillRule="nonzero"
      ></path>
      <path
        d="M8.7295372,14.6839411 C8.35180695,15.0868534 7.71897114,15.1072675 7.31605887,14.7295372 C6.9131466,14.3518069 6.89273254,13.7189711 7.2704628,13.3160589 L11.0204628,9.31605887 C11.3857725,8.92639521 11.9928179,8.89260288 12.3991193,9.23931335 L15.358855,11.7649545 L19.2151172,6.88035571 C19.5573373,6.44687693 20.1861655,6.37289714 20.6196443,6.71511723 C21.0531231,7.05733733 21.1271029,7.68616551 20.7848828,8.11964429 L16.2848828,13.8196443 C15.9333973,14.2648593 15.2823707,14.3288915 14.8508807,13.9606866 L11.8268294,11.3801628 L8.7295372,14.6839411 Z"
        fill="#000000"
        fillRule="nonzero"
        opacity="0.3"
      ></path>
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

const LINK_POSTS = {
  title: "Posts",
  icon: (
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect x="0" y="0" width="24" height="24"></rect>
      <path
        d="M18,15 L18,13.4774152 C18,13.3560358 18.0441534,13.2388009 18.1242243,13.147578 C18.3063883,12.9400428 18.622302,12.9194754 18.8298372,13.1016395 L21.7647988,15.6778026 C21.7814819,15.6924462 21.7971714,15.7081846 21.811763,15.7249133 C21.9932797,15.933015 21.9717282,16.2488631 21.7636265,16.4303797 L18.828665,18.9903994 C18.7375973,19.0698331 18.6208431,19.1135979 18.5,19.1135979 C18.2238576,19.1135979 18,18.8897403 18,18.6135979 L18,17 L16.445419,17 C14.5938764,17 12.8460429,16.1451629 11.7093057,14.6836437 L7.71198984,9.54423755 C6.95416504,8.56989138 5.7889427,8 4.55458097,8 L2,8 L2,6 L4.55458097,6 C6.40612357,6 8.15395708,6.85483706 9.29069428,8.31635632 L13.2880102,13.4557625 C14.045835,14.4301086 15.2110573,15 16.445419,15 L18,15 Z"
        fill="#000000"
        fillRule="nonzero"
        opacity="0.3"
      ></path>
      <path
        d="M18,6 L18,4.4774157 C18,4.3560363 18.0441534,4.23880134 18.1242243,4.14757848 C18.3063883,3.94004327 18.622302,3.9194759 18.8298372,4.10163997 L21.7647988,6.67780304 C21.7814819,6.69244668 21.7971714,6.70818509 21.811763,6.72491379 C21.9932797,6.93301548 21.9717282,7.24886356 21.7636265,7.43038021 L18.828665,9.99039986 C18.7375973,10.0698336 18.6208431,10.1135984 18.5,10.1135984 C18.2238576,10.1135984 18,9.88974079 18,9.61359842 L18,8 L16.445419,8 C15.2110573,8 14.045835,8.56989138 13.2880102,9.54423755 L9.29069428,14.6836437 C8.15395708,16.1451629 6.40612357,17 4.55458097,17 L2,17 L2,15 L4.55458097,15 C5.7889427,15 6.95416504,14.4301086 7.71198984,13.4557625 L11.7093057,8.31635632 C12.8460429,6.85483706 14.5938764,6 16.445419,6 L18,6 Z"
        fill="#000000"
        fillRule="nonzero"
      ></path>
    </g>
  ),
  url: "/posts",
};

const SECTIONS: any = [
  {
    title: "",
    links: [LINK_DASHBOARD],
  },
  ,
  {
    title: "Users",
    links: [LINK_USERS, LINK_POSTS],
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
                        <span className="menu-icon svg-icon">
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
