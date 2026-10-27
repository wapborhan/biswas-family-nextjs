import React from "react";

const Awards = ({ userData }) => {
  const rewardsList = userData?.rewards || userData?.awards || [];

  return (
    <div className="container" id="rewards">
      <div className="personal-experience-inner">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <span className="subtitle">কৃতিত্ব ও স্বীকৃতি</span>
              <h4 className="maintitle">Awards & Rewards</h4>
              <div className="experience-list padding-none border-none">
                {rewardsList.length === 0 ? (
                  <div className="p-4 text-center text-muted bg-light rounded mt-3">
                    কোনো পুরস্কার বা সম্মাননার তথ্য যোগ করা হয়নি।
                  </div>
                ) : (
                  rewardsList.map((reward, idx) => (
                    <div className="resume-single-list mt--30" key={reward._id || idx}>
                      <div className="inner psudo-after-none">
                        <div className="heading">
                          <div className="title">
                            <h4>{reward.title || "পুরস্কার / সম্মাননা"}</h4>
                            <span>
                              {reward.year ? `সালঃ ${reward.year}` : ""}
                            </span>
                          </div>
                          {reward.year && (
                            <div className="date-of-time">
                              <span>{reward.year}</span>
                            </div>
                          )}
                        </div>
                        {reward.description && (
                          <p className="description">
                            {reward.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
