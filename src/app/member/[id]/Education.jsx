import React from "react";

const levelLabels = {
  primary: "প্রাথমিক (Primary)",
  secondary: "মাধ্যমিক (Secondary)",
  "higher-secondary": "উচ্চ মাধ্যমিক (Higher Secondary)",
  university: "বিশ্ববিদ্যালয় (University)",
};

const Education = ({ userData }) => {
  const educationList = userData?.education || [];
  const occupationsList = userData?.occupations || userData?.work || [];

  return (
    <div className="container" id="resume">
      <div className="personal-experience-inner">
        <div className="row">
          {/* Education Quality */}
          <div className="col-12 mb--50">
            <div className="content">
              <span className="subtitle">শিক্ষাগত বিবরণ</span>
              <h4 className="maintitle">Education Quality</h4>
              <div className="experience-list padding-none border-none">
                {educationList.length === 0 ? (
                  <div className="p-4 text-center text-muted bg-light rounded mt-3">
                    কোনো শিক্ষাগত বিবরণ যোগ করা হয়নি।
                  </div>
                ) : (
                  educationList.map((edu, idx) => {
                    const levelName =
                      levelLabels[edu.level] ||
                      edu.level ||
                      edu.degree ||
                      "শিক্ষাস্তর";
                    const instituteName =
                      edu.institute || edu.institution || "শিক্ষা প্রতিষ্ঠান";

                    return (
                      <div
                        className="resume-single-list mt--30"
                        key={edu._id || idx}
                      >
                        <div className="inner psudo-after-none">
                          <div className="heading">
                            <div className="title">
                              <h4>{levelName}</h4>
                              <span>
                                {instituteName}
                                {edu.passingYear ? ` (${edu.passingYear})` : ""}
                              </span>
                            </div>
                            {edu.passingYear && (
                              <div className="date-of-time">
                                <span>পাসঃ {edu.passingYear}</span>
                              </div>
                            )}
                          </div>
                          {(edu.fieldOfStudy || edu.grade) && (
                            <p className="description">
                              {edu.fieldOfStudy && (
                                <>
                                  <strong>বিভাগঃ</strong>{" "}
                                  {edu.fieldOfStudy}{" "}
                                </>
                              )}
                              {edu.grade && (
                                <>
                                  <strong>গ্রেডঃ</strong> {edu.grade}
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Job & Occupation Experience */}
          <div className="col-12 mt_md--60 mt_sm--60">
            <div className="content">
              <span className="subtitle">পেশাগত বিবরণ</span>
              <h4 className="maintitle">Job & Occupation Experience</h4>
              <div className="experience-list padding-none border-none">
                {occupationsList.length === 0 ? (
                  <div className="p-4 text-center text-muted bg-light rounded mt-3">
                    কোনো কর্মজীবনের তথ্য যোগ করা হয়নি।
                  </div>
                ) : (
                  occupationsList.map((job, idx) => {
                    const titleName = job.title || job.designation || "পদবী";
                    const orgName = job.organization || "প্রতিষ্ঠান";

                    const startYear = job.startDate
                      ? new Date(job.startDate).getFullYear()
                      : job.startYear;
                    const endYear = job.endDate
                      ? new Date(job.endDate).getFullYear()
                      : job.endYear;

                    return (
                      <div
                        className="resume-single-list mt--30"
                        key={job._id || idx}
                      >
                        <div className="inner psudo-after-none">
                          <div className="heading">
                            <div className="title">
                              <h4>{titleName}</h4>
                              <span>
                                {orgName}
                                {startYear
                                  ? ` (${startYear} - ${
                                      job.isCurrent
                                        ? "বর্তমান"
                                        : endYear || "চলমান"
                                    })`
                                  : ""}
                              </span>
                            </div>
                            {job.location && (
                              <div className="date-of-time">
                                <span>{job.location}</span>
                              </div>
                            )}
                          </div>
                          {(job.responsibilities || job.location) && (
                            <p className="description">
                              {job.location && (
                                <>
                                  <strong>কর্মস্থলঃ</strong> {job.location}
                                  <br />
                                </>
                              )}
                              {job.responsibilities && (
                                <>
                                  <strong>দায়িত্বঃ</strong>{" "}
                                  {job.responsibilities}
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
