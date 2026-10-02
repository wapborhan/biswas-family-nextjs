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

  const fatherData = familyMember.find((m) => m.id === fatherId);
  const motherData = familyMember.find((m) => m.id === motherId);

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
                    পিতাঃ {fatherData ? fatherData.fullName : "অজানা"}
                  </h4>
                  <h4 className="title text-uppercase  mb-3">
                    মাতাঃ {motherData ? motherData.fullName : "অজানা"}
                  </h4>
                </>
              ) : (
                <>
                  <h4 className="title text-uppercase">
                    {gender === "male" ? (
                      <>পিতাঃ {fatherData ? fatherData.fullName : "অজানা"} </>
                    ) : (
                      <>স্বামীঃ</>
                    )}
                  </h4>
                  <h4 className="title text-uppercase mb-3">
                    মাতাঃ {motherData ? motherData.fullName : "অজানা"}
                  </h4>
                </>
              )}
            </div>
            <div className="category-info p-0">
              <div className="card-btn-container d-flex justify-content-between w-100">
                <span className="btn card-btn" style={{ cursor: "default" }}>
                  জন্মঃ {birth ? formatDate(birth?.date) : "অজানা"}
                </span>

                <span className="btn card-btn" style={{ cursor: "default" }}>
                  {death?.date
                    ? `মৃত্যুঃ ${formatDate(death?.date)}`
                    : `বয়সঃ ${calculateAge(birth?.date)} বছর`}
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
