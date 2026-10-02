import React from "react";

const About = () => {
  return (
    <div className="row mt--40 tab-content-wrapper">
      <div className="col-lg-12">
        <div className="tab-area">
          <div className="d-flex align-items-start">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade  show active"
                id="v-pills-Javascript"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                {/* Start about Area */}
                <div id="about" className="rn-about-area">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-5">
                        <div
                          className="image-area shadow-none padding-none aos-init aos-animate"
                          data-aos="fade-up"
                          data-aos-duration={1000}
                          data-aos-delay={100}
                          data-aos-once="true"
                        >
                          <div className="thumbnail">
                            <img
                              src="https://freesvg.org/img/Male-Avatar.png"
                              alt="Personal Portfolio Image"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        data-aos="fade-up"
                        data-aos-duration={1000}
                        data-aos-delay={100}
                        data-aos-once="true"
                        className="col-lg-7 mt_sm--30 aos-init aos-animate"
                      >
                        <div className="contant">
                          <div className="section-title text-left">
                            <span className="subtitle">
                              Visit my portfolio &amp; Hire me
                            </span>
                            <h2 className="title small-h2">About Me</h2>
                          </div>
                          <p className="discription color-body-white">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Eum in eos saepe ipsa cupiditate accusantium
                            voluptatibus quidem nam, reprehenderit, et
                            necessitatibus adipisci.
                          </p>
                          <ul className="about-skill-style mb--40">
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Web Design Full stack</span>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>24/7 Support</span>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Unlimited Revisions</span>
                            </li>
                          </ul>
                          <a className="rn-btn" href="#">
                            <span>DOWNLOAD MY CV</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* what I am doing area End */}
                    <div className="row mt--50">
                      {/* Brand style three */}
                      <div className="rn-brand-area">
                        <div className="container">
                          <div className="row mb--30">
                            <div className="col-12 text-center">
                              <h6 className="title color-lightn m--0">
                                Our trusted Clients
                              </h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="brand-wrapper-three mb_dec--30">
                              {/* Start Single Brand  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={300}
                                data-aos-once="true"
                                className="rn-brand flex-basis-style-1 aos-init aos-animate"
                              >
                                <div className="border-style shadow-none inner smlg-brand text-center">
                                  <div className="thumbnail">
                                    <a href="#">
                                      <img
                                        src="https://freesvg.org/img/Male-Avatar.png"
                                        alt="Client-image"
                                      />
                                    </a>
                                  </div>
                                  <div className="seperator" />
                                  <div className="client-name">
                                    <span>
                                      <a href="#">Marth Smiths</a>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Brand  */}
                              {/* Start Single Brand  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={400}
                                data-aos-once="true"
                                className="rn-brand flex-basis-style-1 aos-init aos-animate"
                              >
                                <div className="border-style shadow-none inner smlg-brand text-center">
                                  <div className="thumbnail">
                                    <a href="#">
                                      <img
                                        src="https://freesvg.org/img/Female-Avatar.png"
                                        alt="Client-image"
                                      />
                                    </a>
                                  </div>
                                  <div className="seperator" />
                                  <div className="client-name">
                                    <span>
                                      <a href="#">Marth Smiths</a>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Brand  */}
                              {/* Start Single Brand  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={500}
                                data-aos-once="true"
                                className="rn-brand flex-basis-style-1 aos-init aos-animate"
                              >
                                <div className="border-style shadow-none inner smlg-brand text-center">
                                  <div className="thumbnail">
                                    <a href="#">
                                      <img
                                        src="https://freesvg.org/img/Male-Avatar.png"
                                        alt="Client-image"
                                      />
                                    </a>
                                  </div>
                                  <div className="seperator" />
                                  <div className="client-name">
                                    <span>
                                      <a href="#">Marth Smiths</a>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Brand  */}
                              {/* Start Single Brand  */}
                              <div
                                data-aos="fade-up"
                                data-aos-duration={1000}
                                data-aos-delay={100}
                                data-aos-once="true"
                                className="rn-brand flex-basis-style-1 aos-init aos-animate"
                              >
                                <div className="border-style shadow-none inner smlg-brand text-center">
                                  <div className="thumbnail">
                                    <a href="#">
                                      <img
                                        src="https://freesvg.org/img/Male-Avatar.png"
                                        alt="Client-image"
                                      />
                                    </a>
                                  </div>
                                  <div className="seperator" />
                                  <div className="client-name">
                                    <span>
                                      <a href="#">Marth Smiths</a>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* End Single Brand  */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Brand style three End */}
                    </div>
                  </div>
                </div>
                {/* End about Area */}
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-Design"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <div className="container" id="resume">
                  {/* resume area start */}
                  <div className="personal-experience-inner">
                    <div className="row">
                      <div className="personal-experience-inner">
                        <div className="row m--0">
                          {/* Start Skill List Area  */}
                          <div className="col-lg-6 col-md-12 col-12">
                            <div className="content">
                              <span className="subtitle">2007 - 2010</span>
                              <h4 className="maintitle">Education Quality</h4>
                              <div className="experience-list padding-none border-none">
                                {/* Start Single List  */}
                                <div className="resume-single-list mt--30">
                                  <div className="inner psudo-after-none psudo-after-none">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>Personal Portfolio April Fools</h4>
                                        <span>
                                          University of DVI (1997 - 2001)
                                        </span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>4.30/5</span>
                                      </div>
                                    </div>
                                    <p className="description">
                                      The education should be very interactual.
                                      Ut tincidunt est ac dolor aliquam sodales.
                                      Phasellus sed mauris hendrerit, laoreet
                                      sem in, lobortis mauris hendrerit ante.
                                    </p>
                                  </div>
                                </div>
                                {/* End Single List  */}
                                {/* Start Single List  */}
                                <div className="resume-single-list mt--30">
                                  <div className="inner psudo-after-none">
                                    <div className="heading">
                                      <div className="title">
                                        <h4> Examples Of Personal Portfolio</h4>
                                        <span>
                                          College of Studies (2000 - 2002)
                                        </span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>4.50/5</span>
                                      </div>
                                    </div>
                                    <p className="description">
                                      Maecenas finibus nec sem ut imperdiet. Ut
                                      tincidunt est ac dolor aliquam sodales.
                                      Phasellus sed mauris hendrerit, laoreet
                                      sem in, lobortis mauris hendrerit ante.
                                    </p>
                                  </div>
                                </div>
                                {/* End Single List  */}
                              </div>
                            </div>
                          </div>
                          {/* End Skill List Area  */}
                          {/* Start Skill List Area 2nd  */}
                          <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                            <div className="content">
                              <span className="subtitle">2007 - 2010</span>
                              <h4 className="maintitle">Job Experience</h4>
                              <div className="experience-list padding-none border-none">
                                {/* Start Single List  */}
                                <div className="resume-single-list mt--30">
                                  <div className="inner psudo-after-none">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>Diploma in Web Development</h4>
                                        <span>BSE In CSE (2004 - 2008)</span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>4.70/5</span>
                                      </div>
                                    </div>
                                    <p className="description">
                                      Contrary to popular belief. Ut tincidunt
                                      est ac dolor aliquam sodales. Phasellus
                                      sed mauris hendrerit, laoreet sem in,
                                      lobortis mauris hendrerit ante.
                                    </p>
                                  </div>
                                </div>
                                {/* End Single List  */}
                                {/* Start Single List  */}
                                <div className="resume-single-list mt--30">
                                  <div className="inner psudo-after-none">
                                    <div className="heading">
                                      <div className="title">
                                        <h4>The Personal Portfolio Mystery</h4>
                                        <span>
                                          Job at Rainbow-Themes (2008 - 2016)
                                        </span>
                                      </div>
                                      <div className="date-of-time">
                                        <span>4.95/5</span>
                                      </div>
                                    </div>
                                    <p className="description">
                                      Generate Lorem Ipsum which looks. Ut
                                      tincidunt est ac dolor aliquam sodales.
                                      Phasellus sed mauris hendrerit, laoreet
                                      sem in, lobortis mauris hendrerit ante.
                                    </p>
                                  </div>
                                </div>
                                {/* End Single List  */}
                              </div>
                            </div>
                          </div>
                          {/* End Skill List Area  */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* resume area End */}
                  <div className="row mt--50">
                    {/* Start Single Progressbar  */}
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="progress-wrapper">
                        <div className="content">
                          <span className="subtitle">Features</span>
                          <h4 className="maintitle">Design Skill</h4>
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">PHOTOSHOT</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.5s"
                                data-wow-delay=".3s"
                                role="progressbar"
                                style={{
                                  width: "100%",
                                  visibility: "visible",
                                  animationDuration: "0.5s",
                                  animationDelay: "0.3s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">100%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">FIGMA</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.6s"
                                data-wow-delay=".4s"
                                role="progressbar"
                                style={{
                                  width: "95%",
                                  visibility: "visible",
                                  animationDuration: "0.6s",
                                  animationDelay: "0.4s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">95%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">ADOBE XD</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.7s"
                                data-wow-delay=".5s"
                                role="progressbar"
                                style={{
                                  width: "60%",
                                  visibility: "visible",
                                  animationDuration: "0.7s",
                                  animationDelay: "0.5s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">60%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">
                              ADOBE ILLUSTRATOR
                            </h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.8s"
                                data-wow-delay=".6s"
                                role="progressbar"
                                style={{
                                  width: "70%",
                                  visibility: "visible",
                                  animationDuration: "0.8s",
                                  animationDelay: "0.6s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">70%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                        </div>
                      </div>
                    </div>
                    {/* End Single Progressbar  */}
                    {/* Start Single Progressbar  */}
                    <div className="col-lg-6 col-md-6 col-12 mt_sm--60">
                      <div className="progress-wrapper">
                        <div className="content">
                          <span className="subtitle">Features</span>
                          <h4 className="maintitle">Development Skill</h4>
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">HTML</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.5s"
                                data-wow-delay=".3s"
                                role="progressbar"
                                style={{
                                  width: "85%",
                                  visibility: "visible",
                                  animationDuration: "0.5s",
                                  animationDelay: "0.3s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">85%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">CSS</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.6s"
                                data-wow-delay=".4s"
                                role="progressbar"
                                style={{
                                  width: "80%",
                                  visibility: "visible",
                                  animationDuration: "0.6s",
                                  animationDelay: "0.4s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">80%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">JAVASCRIPT</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.7s"
                                data-wow-delay=".5s"
                                role="progressbar"
                                style={{
                                  width: "90%",
                                  visibility: "visible",
                                  animationDuration: "0.7s",
                                  animationDelay: "0.5s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">90%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                          {/* Start Single Progress Charts */}
                          <div className="progress-charts">
                            <h6 className="heading heading-h6">SOFTWARE</h6>
                            <div className="progress">
                              <div
                                className="progress-bar wow fadeInLeft animated"
                                data-wow-duration="0.8s"
                                data-wow-delay=".6s"
                                role="progressbar"
                                style={{
                                  width: "75%",
                                  visibility: "visible",
                                  animationDuration: "0.8s",
                                  animationDelay: "0.6s",
                                  animationName: "fadeInLeft",
                                }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <span className="percent-label">75%</span>
                              </div>
                            </div>
                          </div>
                          {/* End Single Progress Charts */}
                        </div>
                      </div>
                    </div>
                    {/* End Single Progressbar  */}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-Wordpress"
                role="tabpanel"
                aria-labelledby="v-pills-wordpress-tab"
              >
                {/* Start Portfolio Area */}
                <div className="rn-portfolio-area" id="portfolio">
                  <div className="container">
                    <div className="row mt--10 mt_md--10 mt_sm--10 mt-dec-30">
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={100}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-01.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Development</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    600
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  The services provide for design{" "}
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={300}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-02.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Application</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    750
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Mobile app landing design &amp; app maintain
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={500}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-03.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Photoshop</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    630
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Logo design creativity &amp; Application
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={100}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-04.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Figma</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    360
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Mobile app landing design &amp; Services
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={300}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-05.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Web Design</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    280
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Design for tecnology,service
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                      {/* Start Single Portfolio */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay={500}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30 aos-init aos-animate"
                      >
                        <div
                          className="rn-portfolio"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/portfolio/portfolio-06.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Web Design</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <a href="javascript:void(0)">
                                      <i className="feather-heart" />
                                    </a>
                                    690
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  App for tecnology &amp; services
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single Portfolio */}
                    </div>
                    <div className="row mt--40">
                      <div className="col-12 text-center">
                        <a className="rn-btn" href="#">
                          See More <i className="feather-loader" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End portfolio Area */}
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tabs"
              >
                {/* Start News Area */}
                <div className="rn-blog-area" id="blog">
                  <div className="container">
                    <div className="row mt-dec-30">
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={400}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-01.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Canada</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 2 min read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  T-shirt design is the part of design
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={600}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-02.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Development</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 2 hour read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  The services provide for design{" "}
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={800}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-03.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Application</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 5 min read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Mobile app landing design &amp; app maintain
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={400}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-03.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Canada</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 2 min read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  T-shirt design is the part of design
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={600}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-01.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Development</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 2 hour read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  The services provide for design{" "}
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                      {/* Start Single blog */}
                      <div
                        data-aos="fade-up"
                        data-aos-duration={500}
                        data-aos-delay={800}
                        data-aos-once="true"
                        className="col-lg-6 col-xl-4 mt--30 col-md-6 col-sm-12 col-12 aos-init aos-animate"
                      >
                        <div
                          className="rn-blog"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenters"
                        >
                          <div className="inner">
                            <div className="thumbnail">
                              <a href="javascript:void(0)">
                                <img
                                  src="assets/images/blog/blog-02.jpg"
                                  alt="Personal Portfolio Images"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <div className="category-info">
                                <div className="category-list">
                                  <a href="javascript:void(0)">Application</a>
                                </div>
                                <div className="meta">
                                  <span>
                                    <i className="feather-clock" /> 5 min read
                                  </span>
                                </div>
                              </div>
                              <h4 className="title">
                                <a href="javascript:void(0)">
                                  Mobile app landing design &amp; app maintain
                                  <i className="feather-arrow-up-right" />
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Single blog */}
                    </div>
                    <div className="row mt--40">
                      <div className="col-12 text-center">
                        <a className="rn-btn" href="#">
                          See More <i className="feather-loader" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ENd Mews Area */}
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-python"
                role="tabpanel"
                aria-labelledby="v-pills-python-tabs"
              >
                {/* Start Contact section */}
                <div className="rn-contact-area" id="contacts">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="contact-about-area">
                          <div className="thumbnail">
                            <img
                              src="assets/images/contact/contact1.png"
                              alt="contact-img"
                            />
                          </div>
                          <div className="title-area">
                            <h4 className="title">Nevine Acotanza</h4>
                            <span>Chief Operating Officer</span>
                          </div>
                          <div className="description">
                            <p>
                              I am available for freelance work. Connect with me
                              via and call in to my account.
                            </p>
                            <span className="phone">
                              Phone: <a href="tel:01941043264">+01234567890</a>
                            </span>
                            <span className="mail">
                              Email:{" "}
                              <a href="mailto:admin@example.com">
                                admin@example.com
                              </a>
                            </span>
                          </div>
                          <div className="social-area">
                            <div className="name">FIND WITH ME</div>
                            <div className="social-icone">
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-facebook"
                                >
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                              </a>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-linkedin"
                                >
                                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                  <rect x={2} y={9} width={4} height={12} />
                                  <circle cx={4} cy={4} r={2} />
                                </svg>
                              </a>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-instagram"
                                >
                                  <rect
                                    x={2}
                                    y={2}
                                    width={20}
                                    height={20}
                                    rx={5}
                                    ry={5}
                                  />
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                  <line
                                    x1="17.5"
                                    y1="6.5"
                                    x2="17.51"
                                    y2="6.5"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-aos-delay={600}
                        className="col-lg-7 contact-input"
                      >
                        <div className="contact-form-wrapper ml--0">
                          <div className="introduce">
                            <form
                              className="rnt-contact-form rwt-dynamic-form row"
                              id="contact-form"
                              method="POST"
                              action="mail.php"
                            >
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label htmlFor="contact-name">
                                    Your Name
                                  </label>
                                  <input
                                    className="form-control form-control-lg"
                                    name="contact-name"
                                    id="contact-name"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label htmlFor="contact-phone">
                                    Phone Number
                                  </label>
                                  <input
                                    className="form-control"
                                    name="contact-phone"
                                    id="contact-phone"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="contact-email">Email</label>
                                  <input
                                    className="form-control form-control-sm"
                                    id="contact-email"
                                    name="contact-email"
                                    type="email"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="subject">subject</label>
                                  <input
                                    className="form-control form-control-sm"
                                    id="subject"
                                    name="subject"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="contact-message">
                                    Your Message
                                  </label>
                                  <textarea
                                    name="contact-message"
                                    id="contact-message"
                                    cols={30}
                                    rows={10}
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <button
                                  name="submit"
                                  type="submit"
                                  id="submit"
                                  className="rn-btn"
                                >
                                  <span>SEND MESSAGE</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-arrow-right"
                                  >
                                    <line x1={5} y1={12} x2={19} y2={12} />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
