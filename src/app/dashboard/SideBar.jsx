"use client";

import { dashboardNavItems } from "@/lib/navLinks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const session = useSession();
  const pathname = usePathname();
  const user = session?.data?.user;
  console.log(user);
  const { image, name, email } = user || {};

  return (
    <div className="d-none d-xl-block header-style-2">
      <header className="rn-header-area d-flex align-items-start flex-column left-header-style">
        <div className="logo-area">
          <Link href="/">
            <img src={image} alt="personal-logo" className="w-100" />
          </Link>
          <h5>{name}</h5>
        </div>
        <nav id="sideNavs" className="mainmenu-nav navbar-example2 onepagenav">
          <ul className="primary-menu nav nav-pills">
            {dashboardNavItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.name === "ড্যাশবোর্ড" || item.name === "লগইন" ? (
                  session?.status === "authenticated" &&
                  item.name === "ড্যাশবোর্ড" ? (
                    <Link
                      className={
                        pathname === item.path ? "nav-link active" : "nav-link"
                      }
                      href={item.path}
                    >
                      {item.name}
                    </Link>
                  ) : !session?.status === "authenticated" &&
                    item.name === "লগইন" ? (
                    <Link
                      className={
                        pathname === item.path ? "nav-link active" : "nav-link"
                      }
                      href={item.path}
                    >
                      {item.name}
                    </Link>
                  ) : null
                ) : (
                  <Link
                    className={
                      pathname === item.path ? "nav-link active" : "nav-link"
                    }
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}

            <li className="nav-item">
              {session?.status === "authenticated" && (
                <span className="nav-link" onClick={() => signOut()}>
                  লগআউট
                </span>
              )}
            </li>

            {/* <li className="nav-item current">
              <Link className="nav-link smoth-animation-two" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>{" "}
                Home
              </Link>
            </li> */}
          </ul>
        </nav>
        {/* <div className="footer">
          <div className="social-share-style-1">
            <span className="title">find with me</span>
            <ul className="social-share d-flex liststyle">
              <li className="facebook">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </li>
              <li className="instagram">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-instagram"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
              <li className="linkedin">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </header>
    </div>
  );
};

export default SideBar;
