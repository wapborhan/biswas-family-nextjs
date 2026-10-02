import React from "react";

const DashCard = ({ count, title }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="100"
      data-aos-once="true"
      className="main-content aos-init aos-animate"
    >
      <div className="inner text-center">
        <div className="thumbnail">{count}</div>
        <div className="seperator"></div>
        <div className="client-name">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
