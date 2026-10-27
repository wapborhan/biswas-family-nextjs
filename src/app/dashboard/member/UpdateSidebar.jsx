"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const UpdateSidebar = () => {
  const path = usePathname() || "";
  const parts = path.split("/").filter(Boolean);
  const memberIdx = parts.indexOf("member");

  // e.g. /dashboard/member/64abc.../editInfo
  const id =
    memberIdx !== -1 && parts[memberIdx + 1] ? parts[memberIdx + 1] : "";
  const currentTab = parts[parts.length - 1] || "";

  const menu = [
    { name: "ব্যক্তিগত বিবরণ", path: "editInfo" },
    { name: "পরিবার", path: "editFamily" },
    { name: "শিক্ষা", path: "editEducation" },
    { name: "কাজের বিবরণ", path: "editWork" },
    { name: "পুরস্কার/অর্জন", path: "editAwards" },
    { name: "যোগাযোগ ও ঠিকানা", path: "editContact" },
  ];

  return (
    <div className="d-flex flex-wrap align-content-start h-100">
      <div
        className="position-sticky clients-wrapper sticky-top rbt-sticky-top-adjust w-100"
        style={{ top: "160px" }}
      >
        <ul
          className="nav tab-navigation-button shad flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
        >
          {menu.map((item, index) => {
            const isActive = currentTab === item.path;
            const targetHref = `/dashboard/member/${id}/${item.path}`;

            return (
              <li key={index} className="nav-item">
                <Link
                  className={
                    isActive ? "nav-link shad active" : "nav-link shad"
                  }
                  href={targetHref}
                  role="tab"
                  aria-selected={isActive}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UpdateSidebar;
