import React from "react";

const Banner = () => {
  return (
    <div id="home" className="rn-slider-area">
      <div className="slide slider-style-1">
        <div className="container">
          <div className="row row--30 align-items-center">
            <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
              <div className="content">
                <div className="inner">
                  <span className="subtitle">স্বাগতম বিশ্বাস পরিবার এ</span>
                  <h1 className="title">
                    আমি <span>নিফাজ বিস্বাস</span>
                    <br />
                    {/* <span className="header-caption" id="page-top">
                      <span className="cd-headline clip is-full-width">
                        <span>একজন </span>
                        <span className="cd-words-wrapper">
                          <b className="is-visible">করনধর.</b>
                        </span>
                      </span>
                    </span> */}
                  </h1>

                  <div>
                    <p className="description">
                      আমি আমাদের বংশের কর্তা হিসেবে সর্বদা চেষ্টা করি
                      পূর্বপুরুষদের আদর্শ ও ঐতিহ্যকে অটুট রেখে এগিয়ে যেতে। বংশের
                      প্রতিটি সদস্যের কল্যাণ, শান্তি এবং ঐক্য রক্ষাই আমার কাছে
                      সর্বাধিক দায়িত্ব।
                    </p>
                    <p className="description">
                      একজন প্রধান হিসেবে আমি শুধু কর্তৃত্ব নয়, বরং দায়িত্ব,
                      স্নেহ ও ভালোবাসাকে বেশি গুরুত্ব দিই। ছোটদের প্রতি আন্তরিক
                      মমতা, বড়দের প্রতি শ্রদ্ধা এবং সবার সাথে ন্যায়বিচার বজায়
                      রাখাই আমার অঙ্গীকার।
                    </p>
                    <p className="description">
                      আমি বিশ্বাস করি, আমাদের ঐতিহ্যই আমাদের প্রকৃত শক্তি। তাই
                      আমি সর্বদা চেষ্টা করি বংশের প্রতিটি সদস্যের মধ্যে
                      ভালোবাসা, সহযোগিতা ও সম্মান বজায় রাখতে, যাতে ভবিষ্যৎ
                      প্রজন্ম গর্বের সাথে বলতে পারে— "আমরা এই বংশের সন্তান"।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 order-lg-2 col-lg-5">
              <div className="thumbnail">
                <div className="inner">
                  <img
                    src="https://freesvg.org/img/Male-Avatar.png"
                    alt="Personal Portfolio Images"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
