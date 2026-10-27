"use client";

import React, { useState } from "react";
import SpousesWiseChildrens from "./spousesWiseChildrens";
import Education from "./Education";
import Awards from "./Awards";

export default function MemberTabs({ user, biswasFamilyMember = [] }) {
  const [activeTab, setActiveTab] = useState("family");

  const {
    spousesIds = [],
    gender = "male",
    education = [],
    occupations = [],
    work = [],
    rewards = [],
    awards = [],
    address = {},
    contact = {},
    wedding = {},
  } = user || {};

  const spousesCount = spousesIds.length;
  const eduCount =
    (education?.length || 0) +
    ((occupations?.length || work?.length) || 0);
  const rewardsCount = (rewards?.length || awards?.length || 0);

  // Resolve wedding spouse if set
  const weddingSpouseName = wedding?.spouseId
    ? typeof wedding.spouseId === "object"
      ? wedding.spouseId.fullName
      : biswasFamilyMember.find((m) => m._id == wedding.spouseId)?.fullName ||
        "জীবনসঙ্গী"
    : null;

  return (
    <div className="tab-area">
      {/* Tab Navigation */}
      <div className="container mb--40">
        <ul className="nav rn-nav-list d-flex flex-wrap" role="tablist">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link w-100 ${activeTab === "family" ? "active" : ""}`}
              onClick={() => setActiveTab("family")}
            >
              পরিবার ও সন্তান {spousesCount > 0 ? `(${spousesCount})` : ""}
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link w-100 ${activeTab === "education" ? "active" : ""}`}
              onClick={() => setActiveTab("education")}
            >
              শিক্ষা ও পেশা {eduCount > 0 ? `(${eduCount})` : ""}
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link w-100 ${activeTab === "awards" ? "active" : ""}`}
              onClick={() => setActiveTab("awards")}
            >
              পুরস্কার ও সম্মাননা {rewardsCount > 0 ? `(${rewardsCount})` : ""}
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link w-100 ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              যোগাযোগ ও ঠিকানা
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content Panes */}
      <div className="tab-content" id="memberTabContent">
        {/* Family Tab */}
        {activeTab === "family" && (
          <div className="tab-pane fade show active">
            <div className="container">
              {/* Marriage info banner if present */}
              {(wedding?.dateTime || wedding?.place || weddingSpouseName) && (
                <div className="alert alert-light border shadow-sm p-3 mb-4 rounded d-flex flex-wrap align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 text-primary">💍 বৈবাহিক বিবরণ</h6>
                    <div className="small text-muted">
                      {weddingSpouseName && (
                        <span className="me-3">
                          <strong>জীবনসঙ্গীঃ</strong> {weddingSpouseName}
                        </span>
                      )}
                      {wedding?.dateTime && (
                        <span className="me-3">
                          <strong>তারিখঃ</strong>{" "}
                          {new Date(wedding.dateTime).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                      {wedding?.place && (
                        <span>
                          <strong>স্থানঃ</strong> {wedding.place}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="row mb--30">
                <div className="col-12 text-center">
                  <h5 className="title color-lightn m--0">
                    {gender === "male" ? "স্ত্রী" : "স্বামী"} সমূহ
                  </h5>
                </div>
              </div>

              {spousesIds.length === 0 ? (
                <div className="personal-experience-inner text-center p-5 bg-light rounded">
                  <h5 className="maintitle mb-2 text-dark">
                    কোনো জীবনসঙ্গীর তথ্য পাওয়া যায়নি
                  </h5>
                  <p className="subtitle text-muted mb-0">
                    এই সদস্যের সাথে এখনো কোনো স্বামী বা স্ত্রীর সম্পর্ক যুক্ত করা হয়নি।
                  </p>
                </div>
              ) : (
                spousesIds.map((spouse) => (
                  <SpousesWiseChildrens
                    key={typeof spouse === "object" ? spouse._id : spouse}
                    spouses={
                      typeof spouse === "object"
                        ? spouse
                        : biswasFamilyMember.find((m) => m._id == spouse) || {
                            _id: spouse,
                          }
                    }
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Education & Work Tab */}
        {activeTab === "education" && (
          <div className="tab-pane fade show active">
            <Education userData={user} />
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === "awards" && (
          <div className="tab-pane fade show active">
            <Awards userData={user} />
          </div>
        )}

        {/* Contact & Address Tab */}
        {activeTab === "contact" && (
          <div className="tab-pane fade show active">
            <div className="container">
              <div className="row g-4">
                {/* Present Address */}
                <div className="col-lg-6 col-12">
                  <div className="card h-100 shadow-sm border p-4 bg-white rounded">
                    <h5 className="text-primary border-bottom pb-2 mb-3">
                      📍 বর্তমান ঠিকানা (Present Address)
                    </h5>
                    {address?.present?.village ||
                    address?.present?.policeStation ||
                    address?.present?.district ? (
                      <ul className="list-unstyled mb-0 lh-lg">
                        <li>
                          <strong>গ্রাম / বাসাঃ</strong>{" "}
                          {address.present.village || "—"}
                        </li>
                        <li>
                          <strong>ডাকঘরঃ</strong>{" "}
                          {address.present.postOffice || "—"}
                        </li>
                        <li>
                          <strong>থানা / উপজেলাঃ</strong>{" "}
                          {address.present.policeStation || "—"}
                        </li>
                        <li>
                          <strong>জেলাঃ</strong>{" "}
                          {address.present.district || "—"}
                        </li>
                        <li>
                          <strong>বিভাগঃ</strong>{" "}
                          {address.present.division || "—"}
                        </li>
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">
                        বর্তমান ঠিকানার তথ্য যোগ করা হয়নি।
                      </p>
                    )}
                  </div>
                </div>

                {/* Permanent Address */}
                <div className="col-lg-6 col-12">
                  <div className="card h-100 shadow-sm border p-4 bg-white rounded">
                    <h5 className="text-secondary border-bottom pb-2 mb-3">
                      🏡 স্থায়ী ঠিকানা (Permanent Address)
                    </h5>
                    {address?.permanent?.village ||
                    address?.permanent?.policeStation ||
                    address?.permanent?.district ? (
                      <ul className="list-unstyled mb-0 lh-lg">
                        <li>
                          <strong>গ্রাম / বাড়িঃ</strong>{" "}
                          {address.permanent.village || "—"}
                        </li>
                        <li>
                          <strong>ডাকঘরঃ</strong>{" "}
                          {address.permanent.postOffice || "—"}
                        </li>
                        <li>
                          <strong>থানা / উপজেলাঃ</strong>{" "}
                          {address.permanent.policeStation || "—"}
                        </li>
                        <li>
                          <strong>জেলাঃ</strong>{" "}
                          {address.permanent.district || "—"}
                        </li>
                        <li>
                          <strong>বিভাগঃ</strong>{" "}
                          {address.permanent.division || "—"}
                        </li>
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">
                        স্থায়ী ঠিকানার তথ্য যোগ করা হয়নি।
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact & Social Information */}
                <div className="col-12 mt-4">
                  <div className="card shadow-sm border p-4 bg-white rounded">
                    <h5 className="text-dark border-bottom pb-2 mb-3">
                      📞 যোগাযোগ ও সোশাল মিডিয়া
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-4 col-12">
                        <strong>মোবাইল নাম্বারঃ</strong>
                        <div className="mt-1">
                          {contact?.phone ? (
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-decoration-none text-primary fw-bold"
                            >
                              📞 {contact.phone}
                            </a>
                          ) : (
                            <span className="text-muted">যুক্ত করা হয়নি</span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-4 col-12">
                        <strong>ইমেইল ঠিকানাঃ</strong>
                        <div className="mt-1">
                          {contact?.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-decoration-none text-primary"
                            >
                              ✉️ {contact.email}
                            </a>
                          ) : (
                            <span className="text-muted">যুক্ত করা হয়নি</span>
                          )}
                        </div>
                      </div>

                      <div className="col-md-4 col-12">
                        <strong>জরুরি যোগাযোগঃ</strong>
                        <div className="mt-1">
                          {contact?.emergencyContact ? (
                            <a
                              href={`tel:${contact.emergencyContact}`}
                              className="text-decoration-none text-danger fw-bold"
                            >
                              🚨 {contact.emergencyContact}
                            </a>
                          ) : (
                            <span className="text-muted">যুক্ত করা হয়নি</span>
                          )}
                        </div>
                      </div>

                      {/* Social Media Links */}
                      {contact?.socialMedia && (
                        <div className="col-12 mt-3 pt-3 border-top">
                          <strong className="d-block mb-2">সোশাল মিডিয়া প্রোফাইলঃ</strong>
                          <div className="d-flex flex-wrap gap-3">
                            {contact.socialMedia.facebook && (
                              <a
                                href={
                                  contact.socialMedia.facebook.startsWith("http")
                                    ? contact.socialMedia.facebook
                                    : `https://${contact.socialMedia.facebook}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                Facebook
                              </a>
                            )}
                            {contact.socialMedia.twitter && (
                              <a
                                href={
                                  contact.socialMedia.twitter.startsWith("http")
                                    ? contact.socialMedia.twitter
                                    : `https://${contact.socialMedia.twitter}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-info"
                              >
                                Twitter / X
                              </a>
                            )}
                            {contact.socialMedia.linkedin && (
                              <a
                                href={
                                  contact.socialMedia.linkedin.startsWith("http")
                                    ? contact.socialMedia.linkedin
                                    : `https://${contact.socialMedia.linkedin}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                LinkedIn
                              </a>
                            )}
                            {contact.socialMedia.instagram && (
                              <a
                                href={
                                  contact.socialMedia.instagram.startsWith("http")
                                    ? contact.socialMedia.instagram
                                    : `https://${contact.socialMedia.instagram}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-danger"
                              >
                                Instagram
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
