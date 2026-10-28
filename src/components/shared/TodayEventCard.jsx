import Link from "next/link";
import React from "react";

const TodayEventCard = ({ ev }) => {
  return (
    <div className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30">
      <div className="rn-portfolio w-100">
        <div className="inner">
          <div className="thumbnail">
            <div className="owner">
              <img
                src={ev.avatar}
                className="img-fluid w-25 rounded-circle "
                alt={ev.member.fullName}
              />
            </div>
          </div>
          <div className="content">
            <span
              className={`badge ${ev.badgeColor} text-white mb-1`}
              style={{ fontSize: "11px" }}
            >
              {ev.icon} {ev.milestoneText}
            </span>
            <div className="head d-flex justify-content-between align-items-start flex-column">
              <h4 className="title text-uppercase">
                <a href={`/member/${ev.member._id}`}>
                  {ev.member.fullName}
                  <i></i>
                </a>
              </h4>
              <p>
                {ev.type === "wedding" && ev.spouseName && (
                  <div className="small text-muted">ও {ev.spouseName}</div>
                )}
                {ev.type === "birthday" && ev.isDeceased && (
                  <span className="small text-secondary">
                    (প্রয়াত সদস্যের জন্মবার্ষিকী)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayEventCard;
