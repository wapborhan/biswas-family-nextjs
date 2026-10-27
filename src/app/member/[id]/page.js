import Link from "next/link";
import { fetchMembers } from "@/lib/fetchMembers";
import { formatDate } from "@/lib/formateDate";
import { calculateAge } from "@/lib/calculateAge";
import MemberTabs from "./MemberTabs";

const Page = async ({ params }) => {
  const { id } = await params;
  const biswasFamilyMember = await fetchMembers();

  const user = biswasFamilyMember.find((member) => member._id == id);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger shadow-sm p-4 rounded">
          <h4 className="mb-2">সদস্য পাওয়া যায়নি (Member Not Found)</h4>
          <p className="mb-3 text-muted">
            অনুরোধকৃত সদস্যের তথ্য ডাটাবেজে খুঁজে পাওয়া যায়নি।
          </p>
          <Link href="/members" className="btn btn-primary">
            সকল সদস্যের তালিকা দেখুন
          </Link>
        </div>
      </div>
    );
  }

  const {
    _id,
    fullName = "নামহীন",
    fatherId,
    motherId,
    birth,
    birthDate,
    death,
    deathDate,
    contact = {},
    bloodGroup,
    spousesIds = [],
    childrensIds = [],
    gender = "male",
    address = {},
    isClanRoot,
    isApproved,
    profilePic,
    wedding,
  } = user;

  // Resolve Father & Mother
  const fatherDisplayName =
    typeof fatherId === "object"
      ? fatherId?.fullName
      : biswasFamilyMember.find((m) => m._id == fatherId)?.fullName ||
        (fatherId ? String(fatherId) : "অজানা");

  const motherDisplayName =
    typeof motherId === "object"
      ? motherId?.fullName
      : biswasFamilyMember.find((m) => m._id == motherId)?.fullName ||
        (motherId ? String(motherId) : "অজানা");

  // Resolve Children
  const resolvedChildren = childrensIds.map((child) => {
    if (typeof child === "object" && child?._id) {
      const full = biswasFamilyMember.find((m) => m._id == child._id);
      return full || child;
    }
    return (
      biswasFamilyMember.find((m) => m._id == child) || {
        _id: child,
        fullName: "সন্তান",
      }
    );
  });

  const maleChildren = resolvedChildren.filter((c) => c.gender === "male");
  const femaleChildren = resolvedChildren.filter((c) => c.gender === "female");

  // Life Events calculations
  const birthDateValue = birth?.dateTime || birthDate;
  const birthFormatted = birthDateValue ? formatDate(birthDateValue) : "অজানা";
  const birthPlace = birth?.place;

  const isDeceased = Boolean(death?.isDeceased || death?.dateTime || deathDate);
  const deathDateValue = death?.dateTime || deathDate;
  const deathFormatted = deathDateValue ? formatDate(deathDateValue) : null;
  const deathPlace = death?.place;
  const burialPlace = death?.burialPlace;

  const currentAge =
    !isDeceased && birthDateValue ? calculateAge(birthDateValue) : null;

  // Address
  const presentAddressText = address?.present
    ? [
        address.present.village,
        address.present.postOffice && `ডাকঘরঃ ${address.present.postOffice}`,
        address.present.policeStation && `থানাঃ ${address.present.policeStation}`,
        address.present.district && `জেলাঃ ${address.present.district}`,
        address.present.division && `বিভাগঃ ${address.present.division}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "অজানা";

  // Avatar
  const avatar =
    profilePic ||
    (gender === "female"
      ? "https://freesvg.org/img/Female-Avatar.png"
      : "https://freesvg.org/img/Male-Avatar.png");

  return (
    <div className="main-page-wrapper">
      {/* Header Banner */}
      <div className="rn-header-image-area">
        <div
          className="bg_image--9 bg_image h-100"
          style={{
            backgroundImage: `url("https://wallpapercat.com/w/full/0/9/5/269484-3840x2160-desktop-4k-family-background-photo.jpg")`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="rn-content-wrapper">
        <div className="container">
          {/* Profile Overview Card */}
          <div className="row padding-tb m_dec-top align-items-center d-flex">
            {/* Left Column: Avatar & Basic Relationships */}
            <div className="col-lg-6 col-12">
              <div className="header-left">
                <div className="header-thumbnail position-relative">
                  <img
                    className="rounded-circle bg-white shadow-sm border p-1"
                    src={avatar}
                    alt={fullName}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  {isDeceased && (
                    <span
                      className="position-absolute badge bg-secondary text-white shadow-sm"
                      style={{ bottom: "10px", right: "15px", fontSize: "12px" }}
                    >
                      প্রয়াত
                    </span>
                  )}
                </div>

                <div className="header-info-content mt-3 mt-md-0">
                  <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                    <h3 className="title mb-0">{fullName}</h3>
                    {isClanRoot && (
                      <span className="badge bg-danger text-white">
                        বংশের আদি পুরুষ
                      </span>
                    )}
                    {isApproved ? (
                      <span className="badge bg-success text-white">
                        অনুমোদিত সদস্য
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        অনুমোদন অপেক্ষমাণ
                      </span>
                    )}
                  </div>

                  <div className="status-info mb-3">
                    <div className="text-muted mb-1">
                      <strong>পিতাঃ</strong> {fatherDisplayName}
                    </div>
                    <div className="text-muted mb-1">
                      <strong>মাতাঃ</strong> {motherDisplayName}
                    </div>
                    {isClanRoot && (
                      <div className="small text-primary">
                        * বংশের প্রারম্ভিক পূর্বপুরুষ
                      </div>
                    )}
                  </div>

                  {/* Edit profile link button */}
                  <div>
                    <Link
                      href={`/dashboard/member/${_id}/editInfo`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      ✏️ তথ্য সম্পাদনা (Edit Info)
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Stats, Life Events & Contact Badges */}
            <div className="col-lg-6 col-12 mt-4 mt-lg-0">
              <div className="header-right bg-white p-4 rounded shadow-sm border">
                <div className="skill-area section-height skill-main">
                  <div className="inner slide">
                    {/* Family Counts Badges */}
                    <div className="d-flex justify-content-start flex-wrap gap-2 mb-3">
                      <span className="badge bg-success p-2">
                        {gender === "male" ? "স্ত্রী" : "স্বামী"}:{" "}
                        {spousesIds.length} জন
                      </span>
                      <span className="badge bg-warning text-dark p-2">
                        ছেলে সন্তান: {maleChildren.length} জন
                      </span>
                      <span className="badge bg-primary p-2">
                        মেয়ে সন্তান: {femaleChildren.length} জন
                      </span>
                      <span className="badge bg-info text-dark p-2">
                        মোট সন্তান: {childrensIds.length} জন
                      </span>
                    </div>

                    {/* Member Vital Details */}
                    <ul className="text-left content list-unstyled mb-0 lh-lg">
                      {/* Birth Event */}
                      <li>
                        <strong>জন্মঃ</strong> {birthFormatted}
                        {birthPlace ? ` (${birthPlace})` : ""}
                      </li>

                      {/* Death / Age Event */}
                      <li>
                        {isDeceased ? (
                          <span className="text-danger">
                            <strong>মৃত্যুঃ</strong>{" "}
                            {deathFormatted || "প্রয়াত"}
                            {deathPlace ? ` — স্থানঃ ${deathPlace}` : ""}
                            {burialPlace
                              ? ` (কবরস্থান / মাজারঃ ${burialPlace})`
                              : ""}
                          </span>
                        ) : (
                          <span>
                            <strong>বয়সঃ</strong>{" "}
                            {currentAge !== null ? `${currentAge} বছর` : "অজানা"}
                          </span>
                        )}
                      </li>

                      {/* Blood Group */}
                      <li>
                        <strong>রক্তের গ্রুপঃ</strong>{" "}
                        <span className="badge bg-danger-subtle text-danger border border-danger">
                          {bloodGroup || "অজানা"}
                        </span>
                      </li>

                      {/* Address */}
                      <li>
                        <strong>বর্তমান ঠিকানাঃ</strong> {presentAddressText}
                      </li>
                    </ul>

                    {/* Contact Badges & Social Icons */}
                    {(contact?.phone ||
                      contact?.email ||
                      contact?.socialMedia?.facebook) && (
                      <div className="d-flex flex-wrap align-items-center gap-3 mt-3 pt-3 border-top">
                        {contact?.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="btn btn-sm btn-outline-success"
                            title="কল করুন"
                          >
                            📞 {contact.phone}
                          </a>
                        )}
                        {contact?.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="btn btn-sm btn-outline-secondary"
                            title="ইমেইল পাঠান"
                          >
                            ✉️ {contact.email}
                          </a>
                        )}
                        {contact?.socialMedia?.facebook && (
                          <a
                            href={
                              contact.socialMedia.facebook.startsWith("http")
                                ? contact.socialMedia.facebook
                                : `https://${contact.socialMedia.facebook}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-primary"
                            title="Facebook"
                          >
                            Facebook
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabbed Sections */}
          <div className="row mt--40 tab-content-wrapper">
            <div className="col-12">
              <MemberTabs
                user={user}
                biswasFamilyMember={biswasFamilyMember}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
