import React from "react";

const MembarCard = () => {
  return (
    <div className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30">
      <div className="owner d-flex align-items-end">
        <img
          src="https://freesvg.org/img/Male-Avatar.png"
          className="img-fluid w-25 rounded-circle"
          alt="Profile"
        />
      </div>
      <div className="rn-portfolio w-100">
        <div className="inner">
          <div className="content">
            <div className="head text-center">
              <h4 className="title text-uppercase mb-2">
                <a href="https://github.com/wapborhan">মোঃ নিফাজ বিস্বাস</a>
              </h4>
              <h4 className="title text-uppercase mb-5">পিতাঃ </h4>
            </div>
            <div className="category-info p-0">
              <div className="card-btn-container d-flex justify-content-between">
                <a className="btn card-btn" title="Star">
                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                  </svg>{" "} */}
                  জন্মঃ 0000
                </a>

                <a className="btn card-btn" title="Fork">
                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 4a2 2 0 1 0-2.47 1.94V7a.48.48 0 0 1-.27.44L8.49 8.88l-2.76-1.4A.49.49 0 0 1 5.46 7V5.94a2 2 0 1 0-1 0V7a1.51 1.51 0 0 0 .82 1.34L8 9.74v1.32a2 2 0 1 0 1 0V9.74l2.7-1.36A1.49 1.49 0 0 0 12.52 7V5.92A2 2 0 0 0 14 4zM4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.47 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                  </svg>{" "} */}
                  মৃত্যুঃ 0000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembarCard;
