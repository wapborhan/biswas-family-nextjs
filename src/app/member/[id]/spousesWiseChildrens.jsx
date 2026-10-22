import SVGTik from "@/components/shared/SVGTik";
import Link from "next/link";
import React from "react";

const SpousesWiseChildrens = ({ spouses }) => {
  const { fullName, profilePic, childrensIds, address, fatherId, motherId } =
    spouses;
  const { village, policeStation, district, division } = address?.present;
  // console.log("SpousesWiseChildrens", spouses);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div
            className="image-area shadow-none padding-none aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={1000}
            data-aos-delay={100}
            data-aos-once="true"
          >
            <div className="thumbnail">
              <img src={profilePic} alt={fullName} />
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={1000}
          data-aos-delay={100}
          data-aos-once="true"
          className="col-lg-8 mt_sm--30 aos-init aos-animate"
        >
          <div className="contant">
            <div className="section-title text-left">
              <span className="subtitle">.</span>
              <h2 className="title small-h2">{fullName}</h2>
            </div>
            <p></p>
            <ul className="about-skill-style mb--40">
              <li>
                <SVGTik />
                <span>
                  পিতাঃ{" "}
                  {fatherId
                    ? typeof fatherId === "object"
                      ? fatherId.fullName
                      : fatherId
                    : "অজানা"}
                </span>
              </li>{" "}
              <li>
                <SVGTik />
                <span>
                  মাতাঃ{" "}
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
                  বর্তমান ঠিকানাঃ{" "}
                  {address
                    ? `${village}, ${policeStation}, ${district}, ${division}`
                    : "অজানা"}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* what I am doing area End */}
        <div className="row mt--50">
          {/* Brand style three */}
          <div className="rn-brand-area">
            <div className="container">
              <div className="row mb--30">
                <div className="col-12 text-center">
                  <h6 className="title color-lightn m--0">সন্তান সমূহ</h6>
                </div>
              </div>
              <div className="row">
                <div className="brand-wrapper-three mb_dec--30">
                  {/* Start Single Brand  */}
                  {childrensIds.map((child) => (
                    <div
                      key={child._id}
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={100}
                      data-aos-once="true"
                      className="rn-brand flex-basis-style-1 aos-init aos-animate"
                    >
                      <div className="border-style shadow-none inner smlg-brand text-center">
                        <div className="thumbnail">
                          <Link href={`${child._id}`}>
                            <img src={child.profilePic} alt={child.fullName} />
                          </Link>
                        </div>
                        <div className="seperator" />
                        <div className="client-name">
                          <span>
                            <Link href={`${child._id}`}>{child.fullName}</Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* End Single Brand  */}
                </div>
              </div>
            </div>
          </div>
          {/* Brand style three End */}
        </div>
      </div>
    </div>
  );
};

export default SpousesWiseChildrens;
