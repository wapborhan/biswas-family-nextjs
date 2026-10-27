import { calculateAge } from "@/lib/calculateAge";
import { fetchMembers } from "@/lib/fetchMembers";
import { formatDate } from "@/lib/formateDate";

const MembarCard = async ({ member }) => {
  const {
    _id,
    fullName,
    fatherId,
    motherId,
    birth,
    death,
    gender,
    isMainRoot,
  } = member;

  const familyMember = await fetchMembers();

  const fatherData = familyMember.find((m) => m.id === fatherId || m._id === fatherId);
  const motherData = familyMember.find((m) => m.id === motherId || m._id === motherId);

  const fatherDisplayName =
    typeof fatherId === "object"
      ? fatherId?.fullName
      : fatherData?.fullName || (fatherId ? String(fatherId) : "অজানা");

  const motherDisplayName =
    typeof motherId === "object"
      ? motherId?.fullName
      : motherData?.fullName || (motherId ? String(motherId) : "অজানা");

  return (
    <div className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30">
      <div className="owner d-flex align-items-end">
        <img
          src={`https://freesvg.org/img/${
            gender === "male" ? "Male-Avatar" : "Female-Avatar"
          }.png`}
          className="img-fluid w-25 rounded-circle"
          alt="Profile"
        />
      </div>
      <div className="rn-portfolio w-100">
        <div className="inner">
          <div className="content">
            <div className="head text-center">
              <h4 className="title text-uppercase mb-2">
                <a href={`member/${_id}`}>{fullName}</a>
              </h4>
              {isMainRoot ? (
                <>
                  <h4 className="title text-uppercase">
                    পিতাঃ {fatherDisplayName}
                  </h4>
                  <h4 className="title text-uppercase  mb-3">
                    মাতাঃ {motherDisplayName}
                  </h4>
                </>
              ) : (
                <>
                  <h4 className="title text-uppercase">
                    {gender === "male" ? (
                      <>পিতাঃ {fatherDisplayName} </>
                    ) : (
                      <>স্বামীঃ</>
                    )}
                  </h4>
                  <h4 className="title text-uppercase mb-3">
                    মাতাঃ {motherDisplayName}
                  </h4>
                </>
              )}
            </div>
            <div className="category-info p-0">
              <div className="card-btn-container d-flex justify-content-between w-100">
                <span className="btn card-btn" style={{ cursor: "default" }}>
                  জন্মঃ{" "}
                  {birth?.dateTime || birth?.date
                    ? formatDate(birth.dateTime || birth.date)
                    : "অজানা"}
                </span>

                <span className="btn card-btn" style={{ cursor: "default" }}>
                  {death?.dateTime || death?.date
                    ? `মৃত্যুঃ ${formatDate(death.dateTime || death.date)}`
                    : death?.isDeceased
                    ? "মৃত্যুঃ প্রয়াত"
                    : `বয়সঃ ${calculateAge(birth?.dateTime || birth?.date)} বছর`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembarCard;
