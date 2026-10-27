import SVGTik from "@/components/shared/SVGTik";
import Link from "next/link";
import React from "react";

const SpousesWiseChildrens = ({ spouses }) => {
  if (!spouses) return null;

  const {
    _id,
    fullName = "অজানা",
    profilePic,
    childrensIds = [],
    address,
    fatherId,
    motherId,
    gender,
  } = spouses;

  const present = address?.present || {};
  const { village, policeStation, district, division } = present;

  const avatar =
    profilePic ||
    (gender === "female"
      ? "https://freesvg.org/img/Female-Avatar.png"
      : "https://freesvg.org/img/Male-Avatar.png");

  const addressText = [village, policeStation, district, division]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="container mb--50 pb--40 border-bottom">
      <div className="row align-items-center">
        <div className="col-lg-4 col-md-5 col-12">
          <div
            className="image-area shadow-none padding-none aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1000}
            data-aos-delay={100}
            data-aos-once="true"
          >
            <div className="thumbnail text-center">
              <Link href={`/member/${_id}`}>
                <img
                  src={avatar}
                  alt={fullName}
                  className="rounded-circle img-fluid border"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
              </Link>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration={1000}
          data-aos-delay={100}
          data-aos-once="true"
          className="col-lg-8 col-md-7 col-12 mt_sm--30 aos-init aos-animate"
        >
          <div className="contant">
            <div className="section-title text-left mb-3">
              <span className="subtitle text-primary">জীবনসঙ্গী (Spouse)</span>
              <h3 className="title small-h2 mb-0">
                <Link href={`/member/${_id}`} className="text-dark">
                  {fullName}
                </Link>
              </h3>
            </div>
            <ul className="about-skill-style mb--20">
              <li>
                <SVGTik />
                <span>
                  <strong>পিতাঃ</strong>{" "}
                  {fatherId
                    ? typeof fatherId === "object"
                      ? fatherId.fullName
                      : fatherId
                    : "অজানা"}
                </span>
              </li>
              <li>
                <SVGTik />
                <span>
                  <strong>মাতাঃ</strong>{" "}
                  {motherId
                    ? typeof motherId === "object"
                      ? motherId.fullName
                      : motherId
                    : "অজানা"}
                </span>
              </li>
              <li>
                <SVGTik />
                <span>
                  <strong>বর্তমান ঠিকানাঃ</strong>{" "}
                  {addressText || "অজানা"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Children of this Spouse */}
        <div className="col-12 mt--40">
          <div className="rn-brand-area">
            <div className="container p-0">
              <div className="row mb--20">
                <div className="col-12 text-left">
                  <h6 className="title color-lightn m--0">
                    সন্তান সমূহ ({childrensIds.length} জন)
                  </h6>
                </div>
              </div>

              {childrensIds.length === 0 ? (
                <p className="text-muted small">কোনো সন্তানের তথ্য যুক্ত নেই।</p>
              ) : (
                <div className="row">
                  <div className="brand-wrapper-three mb_dec--30">
                    {childrensIds.map((child) => {
                      if (!child) return null;
                      const childId = child._id || child;
                      const childName = child.fullName || "সন্তান";
                      const childAvatar =
                        child.profilePic ||
                        (child.gender === "female"
                          ? "https://freesvg.org/img/Female-Avatar.png"
                          : "https://freesvg.org/img/Male-Avatar.png");

                      return (
                        <div
                          key={childId}
                          data-aos="fade-up"
                          data-aos-duration={1000}
                          data-aos-delay={100}
                          data-aos-once="true"
                          className="rn-brand flex-basis-style-1 aos-init aos-animate"
                        >
                          <div className="border-style shadow-none inner smlg-brand text-center">
                            <div className="thumbnail">
                              <Link href={`/member/${childId}`}>
                                <img
                                  src={childAvatar}
                                  alt={childName}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="seperator" />
                            <div className="client-name">
                              <span>
                                <Link href={`/member/${childId}`}>
                                  {childName}
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpousesWiseChildrens;
