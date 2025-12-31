"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navLinks";

const Header = () => {
  const { status } = useSession();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";

  return (
    <header className="rn-header haeder-default black-logo-version header--fixed header--sticky">
      <div className="header-wrapper rn-popup-mobile-menu m--0 row align-items-center">
        {/* Logo */}
        <div className="col-lg-2 col-md-6 col-6">
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

        {/* Menu */}
        <div className="col-lg-10 col-md-6 col-6">
          <div className="header-center">
            <nav
              id="sideNav"
              className="mainmenu-nav navbar-example2 d-none d-xl-block onepagenav"
            >
              <ul className="primary-menu nav nav-pills">
                {navItems.map((item, index) => {
                  // hide dashboard if not logged in
                  if (item.name === "ড্যাশবোর্ড" && !isAuthenticated)
                    return null;

                  // hide login if logged in
                  if (item.name === "লগইন" && isAuthenticated) return null;

                  return (
                    <li key={index} className="nav-item">
                      <Link
                        href={item.path}
                        className={
                          pathname === item.path
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}

                {/* Logout */}
                {isAuthenticated && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => signOut()}
                    >
                      লগআউট
                    </span>
                  </li>
                )}
              </ul>
            </nav>

            {/* Mobile Menu */}
            <div className="header-right">
              <div className="hamberger-menu d-block d-xl-none">
                <i id="menuBtn" className="feather-menu humberger-menu">
                  <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="10" />
                    <rect y="30" width="100" height="10" />
                    <rect y="60" width="100" height="10" />
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
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
