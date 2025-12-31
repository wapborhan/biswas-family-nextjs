import React from "react";

const DashCard = ({ count, title }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="100"
      data-aos-once="true"
      class="main-content aos-init aos-animate"
    >
      <div class="inner text-center">
        <div class="thumbnail">{count}</div>
        <div class="seperator"></div>
        <div class="client-name">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
