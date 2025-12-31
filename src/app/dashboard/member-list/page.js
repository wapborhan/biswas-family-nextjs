import { familyMember } from "@/assets/data/nodes";
import React from "react";
import MembersTable from "./MembersTable";

const page = () => {
  // example: fetch only clan root or all members
  const members = familyMember;

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
              <h2 className="title"> সদস্য তালিকা</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt_md--10 mt_sm--10">
          {members && <MembersTable members={members} />}
        </div>
      </div>
    </div>
  );
};

export default page;
