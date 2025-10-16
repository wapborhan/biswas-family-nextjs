import React from "react";
import MembarCard from "./shared/MembarCard";

const Members = () => {
  return (
    <div
      className="rn-service-area rn-section-gap section-separator"
      id="features"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="section-title text-center aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-once="true"
            >
              <span className="subtitle">বিশ্বাস বংশের </span>
              <h2 className="title"> সদস্য</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt_md--10 mt_sm--10">
          <MembarCard />
        </div>
      </div>
    </div>
  );
};

export default Members;
