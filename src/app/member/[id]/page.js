import { fetchMembers } from "@/lib/fetchMembers";
import Education from "./Education";
import SpousesWiseChildrens from "./spousesWiseChildrens";

const Page = async ({ params }) => {
  const { id } = await params;
  const biswasFamilyMember = await fetchMembers();

  const user = biswasFamilyMember.find((member) => member._id == id);

  if (!user) {
    return <div className="p-4 text-red-500">Member not found</div>;
  }
  const {
    fullName,
    fatherId,
    motherId,
    birthDate,
    deathDate,
    contact,
    bloodGroup,
    spousesIds,
    childrensIds,
    gender,
    address,
    isMainRoot,
  } = user;

  // console.log(user);

  const { village, policeStation, district, division } = address?.present;
  const maleChildren = childrensIds.map((chil) => chil.gemder === "male");
  const femaleChildren = childrensIds.map((chil) => chil.gemder === "female");

  return (
    <div className="main-page-wrapper">
      <div className="rn-header-image-area">
        <div
          className="bg_image--9 bg_image h-100"
          style={{
            backgroundImage: `url("https://wallpapercat.com/w/full/0/9/5/269484-3840x2160-desktop-4k-family-background-photo.jpg")`,
            backgroundPosition: " center",
          }}
        ></div>
      </div>
      <div className="rn-content-wrapper">
        <div className="container">
          <div className="row padding-tb m_dec-top align-items-center d-flex">
            <div className="col-lg-6">
              <div className="header-left">
                <div className="header-thumbnail">
                  <img
                    className="rounded-full bg-white pt-2"
                    src={
                      user?.profilePic
                        ? user?.profilePic
                        : user?.gender === "male"
                          ? "https://freesvg.org/img/Male-Avatar.png"
                          : "https://freesvg.org/img/Female-Avatar.png"
                    }
                    alt={fullName}
                  />
                </div>
                <div className="header-info-content">
                  <h4 className="title">
                    <a href={user?.profile?.html_url}>
                      {fullName}
                      {/* <FaExternalLinkAlt className="ms-3" /> */}
                    </a>
                  </h4>
                  <div className="status-info mb-3">
                    {isMainRoot ? (
                      <>
                        <div className="status-info mb-3">
                          পিতাঃ {fatherId ? fatherId.fullName : "অজানা"}
                        </div>
                        <div className="status-info mb-3">
                          মাতাঃ {motherId ? motherId.fullName : "অজানা"}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="status-info mb-3">
                          {gender === "male" ? (
                            <>পিতাঃ {fatherId ? fatherId.fullName : "অজানা"} </>
                          ) : (
                            <>স্বামীঃ</>
                          )}
                        </div>
                        <div className="status-info mb-3">
                          মাতাঃ {motherId ? motherId.fullName : "অজানা"}
                        </div>
                      </>
                    )}
                    <div className="status-info mb-3"></div>
                  </div>

                  {/* <!-- end --> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="header-right">
                {/* <!-- Start skiull area --> */}
                <div className="skill-area section-height skill-main ">
                  <div className="inner slide">
                    <div className="d-flex justify-content-left flex-wrap">
                      <span className="badge bg-success mt-3">
                        স্ত্রী: {spousesIds.length} জন
                      </span>
                      <span className="badge bg-warning ms-3 mt-3">
                        ছেলে সন্তান: {maleChildren.length} জন
                      </span>
                      <span className="badge bg-primary ms-3 mt-3">
                        মেয়ে সন্তান: {femaleChildren.length} জন
                      </span>
                    </div>
                    <div className="skill-share-inner ">
                      <ul className="text-left content mt-4 mb-2 p-0">
                        <li>
                          <b> বর্তমান ঠিকানাঃ </b>
                          {address
                            ? `${village}, ${policeStation}, ${district}, ${division}`
                            : "অজানা"}
                        </li>
                        <li>
                          <b> রক্তের গ্রুপঃ</b> {bloodGroup}
                        </li>

                        <li>
                          Member Since:
                          {/* {dateFormat(
                            user?.profile?.created_at,
                            " dS mmmm yyyy"
                          )} */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!-- End skiull area -->/ */}
              </div>
            </div>
          </div>
          <div className="row mt--40 tab-content-wrapper">
            <div className="col-lg-12">
              <div className="tab-area">
                <div className="d-flex align-items-start">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="container">
                      <div className="row mb--30">
                        <div className="col-12 text-center">
                          <h6 className="title color-lightn m--0">
                            {gender === "male" ? "স্ত্রী" : "স্বামী"} সমূহ
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade  show active"
                      id="v-pills-Javascript"
                    >
                      {/* Start about Area */}
                      <div id="about" className="rn-about-area">
                        {spousesIds.length === 0 ? (
                          <div className="container" id="resume">
                            <div className="personal-experience-inner">
                              <div className="row">
                                <div className="personal-experience-inner">
                                  <div className="row m--0">
                                    <div className="col-lg-12 col-md-12 col-12">
                                      <div className="content">
                                        <span className="subtitle">
                                          No Spouse Found
                                        </span>
                                        <h4 className="maintitle">
                                          This member has no spouse.
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {spousesIds.map((spouse) => (
                              <SpousesWiseChildrens
                                key={spouse._id}
                                spouses={spouse}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <Education userData={user} />
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

export default Page;
