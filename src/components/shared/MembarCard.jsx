import { familyMember } from "@/assets/data/nodes";

const MembarCard = ({ member }) => {
  console.log(member);
  const {
    id,
    name,
    fatherId,
    motherId,
    birthDate,
    deathDate,
    gender,
    isMainRoot,
  } = member;

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
                <a href={`member/${id}`}>{name}</a>
              </h4>
              {isMainRoot ? (
                <>
                  <h4 className="title text-uppercase">
                    পিতাঃ {fatherData ? fatherData.name : "অজানা"}
                  </h4>
                  <h4 className="title text-uppercase  mb-3">
                    মাতাঃ {motherData ? motherData.name : "অজানা"}
                  </h4>
                </>
              ) : (
                <>
                  <h4 className="title text-uppercase">
                    {gender === "male" ? (
                      <>পিতাঃ {fatherData ? fatherData.name : "অজানা"} </>
                    ) : (
                      <>স্বামীঃ</>
                    )}
                  </h4>
                  <h4 className="title text-uppercase mb-3">
                    মাতাঃ {motherData ? motherData.name : "অজানা"}
                  </h4>
                </>
              )}
            </div>
            <div className="category-info p-0">
              <div className="card-btn-container d-flex justify-content-between w-100">
                <span className="btn card-btn" style={{ cursor: "default" }}>
                  জন্মঃ {birthDate}
                </span>

                <span className="btn card-btn" style={{ cursor: "default" }}>
                  মৃত্যুঃ {deathDate}
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
