import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
      <div className="header-wrapper rn-popup-mobile-menu m--0 row align-items-center">
        <div className="col-lg-2 col-6">
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <img
                  src="https://www.wapborhan.com/_next/image?url=%2Fwb-logo.png&w=640&q=75"
                  alt="logo"
                  style={{ width: "60px" }}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-10 col-6">
          <div className="header-center">
            <nav
              id="sideNav"
              className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav"
            >
              <ul className="primary-menu nav nav-pills">
                <li className="nav-item current">
                  <Link className="nav-link" href="/">
                    নিরপাতা
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    পরিবারের সদস্য
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    যোগাযোগ
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header-right">
              {/* <a className="rn-btn" target="_blank">
                <span>D</span>
              </a> */}
              <div className="hamberger-menu d-block d-xl-none">
                <i id="menuBtn" className="feather-menu humberger-menu">
                  <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                  </svg>
                </i>
              </div>
              <div className="close-menu d-block">
                <span className="closeTrigger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
