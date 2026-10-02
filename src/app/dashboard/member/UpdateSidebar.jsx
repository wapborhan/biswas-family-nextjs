"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const UpdateSidebar = () => {
  const session = useSession();
  const path = usePathname();

  const id = path ? path.split("member/")[1]?.split("/")[0] : "";
  const pathname = path.split("/").filter(Boolean).pop();
  const user = session?.data?.user;
  const { name } = user || {};

  console.log(pathname);

  const menu = [
    { name: "ব্যক্তিগত বিবরণ", path: "editInfo" },
    { name: "পরিবার", path: "editFamily" },
    { name: "শিক্ষা", path: "editEducation" },
    { name: "কাজের বিবরণ", path: "editWork" },
    { name: "পুরস্কার/অর্জন", path: "editAwards" },
    { name: "যোগাযোগের তথ্য", path: "editContact" },
  ];
  return (
    <div className="d-flex flex-wrap align-content-start h-100">
      <div
        className="position-sticky clients-wrapper sticky-top rbt-sticky-top-adjust"
        style={{ top: "160px" }}
      >
        <ul
          className="nav tab-navigation-button shad flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
        >
          {menu.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                className={
                  pathname === item.path
                    ? "nav-link shad active"
                    : "nav-link shad"
                }
                href={`/dashboard/member/${id}/${item.path}`}
                role="tab"
                aria-selected="true"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateSidebar;
