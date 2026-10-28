import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* 🌟 ১. বংশের আদি পুরুষ: নিফাজ বিশ্বাস 🌟 */}
      <div id="home" className="rn-slider-area">
        <div className="slide slider-style-1 mt--20">
          <div className="container">
            <div className="row row--30 align-items-center">
              <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--70">
                <div className="content">
                  <div className="inner">
                    <span className="subtitle">
                      স্বাগতম বিশ্বাস পরিবারে • বংশের আদি পুরুষ
                    </span>
                    <h1 className="title">
                      আমি <span>নিফাজ বিশ্বাস</span>
                      <br />
                      <span className="header-caption" id="page-top">
                        <span className="cd-headline clip is-full-width">
                          <span>বংশের </span>{" "}
                          <span className="cd-words-wrappers">
                            <b className="is-visible text-primary">কর্ণধার</b>
                          </span>
                        </span>
                      </span>
                    </h1>

                    <div>
                      <p className="description">
                        আমি আমাদের বংশের কর্তা হিসেবে সর্বদা চেষ্টা করি
                        পূর্বপুরুষদের আদর্শ ও ঐতিহ্যকে অটুট রেখে এগিয়ে যেতে।
                        বংশের প্রতিটি সদস্যের কল্যাণ, শান্তি এবং ঐক্য রক্ষাই
                        আমার কাছে সর্বাধিক দায়িত্ব।
                      </p>
                      <p className="description">
                        একজন প্রধান হিসেবে আমি শুধু কর্তৃত্ব নয়, বরং দায়িত্ব,
                        স্নেহ ও ভালোবাসাকে বেশি গুরুত্ব দিই। ছোটদের প্রতি
                        আন্তরিক মমতা, বড়দের প্রতি শ্রদ্ধা এবং সবার সাথে
                        ন্যায়বিচার বজায় রাখাই আমার অঙ্গীকার।
                      </p>
                      <p className="description">
                        আমি বিশ্বাস করি, আমাদের ঐতিহ্যই আমাদের প্রকৃত শক্তি। তাই
                        আমি সর্বদা চেষ্টা করি বংশের প্রতিটি সদস্যের মধ্যে
                        ভালোবাসা, সহযোগিতা ও সম্মান বজায় রাখতে, যাতে ভবিষ্যৎ
                        প্রজন্ম গর্বের সাথে বলতে পারে— "আমরা এই বংশের সন্তান"।
                      </p>
                    </div>

                    <div className="button-group mt-4 pt-2 d-flex flex-wrap gap-3">
                      <Link href="/members" className="rn-btn px-4 py-3">
                        👥 পরিবারের সদস্যবৃন্দ
                      </Link>
                      <Link
                        href="/important-days"
                        className="rn-btn  px-4 py-3"
                      >
                        📅 গুরুত্বপূর্ণ দিনসমূহ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 order-lg-2 col-lg-5">
                <div className="inner text-center">
                  <img
                    src="https://freesvg.org/img/Male-Avatar.png"
                    alt="নিফাজ বিশ্বাস - বংশের কর্ণধার"
                    className="img-fluid rounded-4 shadow"
                    style={{ maxHeight: "480px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌸 বংশের সম্মানিত দুই মাতৃকা হেডার সেকশন 🌸 */}
      <div className="rn-service-area rn-section-gap section-separator pb--20">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center aos-init aos-animate pt--20"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                data-aos-once="true"
              >
                <span className="subtitle text-primary">
                  স্নেহময়ী মাতৃত্ব ও পারিবারিক ভিত্তি
                </span>
                <h2 className="title">বংশের সম্মানিত দুই মাতৃকা</h2>
                <p
                  className="text-muted mt-2"
                  style={{ maxWidth: "720px", margin: "0 auto" }}
                >
                  যাঁদের অফুরন্ত মমতা, ত্যাগ ও দোয়ার ওপর দাঁড়িয়ে গড়ে উঠেছে
                  আজকের ঐতিহ্যবাহী বিশ্বাস পরিবার
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌸 ২. ১ম স্ত্রী: মোছাঃ গলেজান নেছা 🌸 */}
      <div className="rn-slider-area pt--30 pb--50">
        <div className="slide slider-style-1">
          <div className="container">
            <div className="row row--30 align-items-center">
              {/* Image Left */}
              <div className="order-1 col-lg-5 mb_md--40 mb_sm--40">
                <div className="inner text-center">
                  <img
                    src="https://freesvg.org/img/Female-Avatar.png"
                    alt="মোছাঃ গলেজান নেছা"
                    className="img-fluid rounded-4 shadow"
                    style={{ maxHeight: "450px", objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Text Right */}
              <div className="order-2 col-lg-7">
                <div className="content">
                  <div className="inner">
                    <span className="badge bg-danger text-white mb-2 p-2 px-3">
                      ১ম সহধর্মিণী ও পরম শ্রদ্ধেয় জ্যেষ্ঠা মাতা
                    </span>
                    <h2 className="title mb-3">
                      মোছাঃ <span>গলেজান নেছা</span>
                    </h2>

                    <div className="pe-lg-4">
                      <p className="description">
                        "একটি পরিবারের ভিত্তিপ্রস্তর হিসেবে আমি সবসময় চেয়েছি
                        প্রতিটি সন্তান যেন নীতি-নৈতিকতা, সততা ও ধর্মীয়
                        মূল্যবোধের আলোয় বড় হয়ে ওঠে। একটি পরিবারের প্রকৃত সুখ
                        প্রাচুর্যে নয়, বরং সবার আন্তরিক মায়া, পারস্পরিক
                        সহমর্মিতা ও ক্ষমার মাঝে নিহিত।"
                      </p>
                      <p className="description">
                        "জীবনের যেকোনো কঠিন মুহূর্তে পরম ধৈর্য ও নিষ্ঠার সাথে
                        সংসার আগলে রাখা এবং পরিবারের সবাইকে ভালোবাসার এক সুতোয়
                        বেঁধে রাখাই ছিল আমার জীবনের পরম ব্রত। আজ পরিবারের নতুন
                        প্রজন্মকে সৎ ও প্রতিষ্ঠিত হতে দেখলে মন শান্তিতে ভরে
                        যায়।"
                      </p>
                      <p className="description">
                        "আমার আজীবনের দোয়া রইল— আমাদের ভবিষ্যৎ বংশধরেরা যেন
                        সর্বদা একতাবদ্ধ থাকে, বিপদে একে অপরের পাশে ঢাল হয়ে
                        দাঁড়ায় এবং বিশ্বাস বংশের মর্যাদা ও সম্মানকে আজীবন
                        সমুন্নত রাখে।"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌸 ৩. ২য় স্ত্রী: মোছাঃ লামিয়া খাতুন 🌸 */}
      <div className="rn-slider-area section-separator pt--50 pb--80">
        <div className="slide slider-style-1">
          <div className="container">
            <div className="row row--30 align-items-center">
              {/* Text Left */}
              <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
                <div className="content">
                  <div className="inner">
                    <span className="badge bg-primary text-white mb-2 p-2 px-3">
                      ২য় সহধর্মিণী ও স্নেহময়ী মাতা
                    </span>
                    <h2 className="title mb-3">
                      মোছাঃ <span> দুলু জান</span>
                    </h2>

                    <div>
                      <p className="description">
                        "একটি সংসারকে সুশৃঙ্খল, সুন্দর ও শান্তিময় করে গড়ে তুলতে
                        প্রয়োজন গভীর মমতা, কোমলতা ও নিঃস্বার্থ আত্মত্যাগ।
                        সন্তানদের ভালো মানুষ হিসেবে গড়ে তোলার পেছনে প্রতিটি
                        মায়ের যে স্নেহ ও যত্ন প্রয়োজন, আমি আজীবন সেই দায়িত্বকে
                        শ্রদ্ধার সাথে পালন করেছি।"
                      </p>
                      <p className="description">
                        "পরিবারে সম্প্রীতি বজায় রাখা, বড়দের প্রতি পরম শ্রদ্ধাবোধ
                        এবং ছোটদের স্নেহ দিয়ে সঠিক পথে পরিচালিত করার শিক্ষা
                        দেওয়াই ছিল আমার অন্যতম উদ্দেশ্য।"
                      </p>
                      <p className="description">
                        "মহান আল্লাহ তায়ালার দরবারে কায়মনোবাক্যে প্রার্থনা করি,
                        বিশ্বাস পরিবারের প্রতিটি প্রদীপ যেন জ্ঞানের আলোয় উজ্জ্বল
                        হয় এবং আমাদের রক্তের বন্ধন, ভালোবাসা ও ঐক্য বংশ পরম্পরায়
                        চির অমলিন থাকে।"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Right */}
              <div className="order-1 order-lg-2 col-lg-5">
                <div className="inner text-center">
                  <img
                    src="https://freesvg.org/img/Female-Avatar.png"
                    alt="মোছাঃ লামিয়া খাতুন"
                    className="img-fluid rounded-4 shadow"
                    style={{ maxHeight: "450px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
