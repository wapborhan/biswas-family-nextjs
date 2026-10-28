import React from "react";
import TodayEventCard from "@/components/shared/TodayEventCard";

const TodaysEvents = ({
  todayEvents = [],
  toBnNumber,
  BENGALI_MONTHS,
  currentDay = new Date().getDate(),
  currentMonthIdx = new Date().getMonth(),
}) => {
  return (
    <>
      {/* 🌟 1. ACTIVE TODAY BANNER / HERO SECTION 🌟 */}
      <div className="row mb--50 sect-main" id="portfolio">
        <div className="col-12 rn-portfolio-area">
          <div className="row">
            <div className="col-md-8">
              <div className="catt-title">
                <h3>
                  আজকের বিশেষ <span className="txt-success">দিনসমূহ</span>{" "}
                  (Today's Events)
                </h3>
                <div className="text-right">
                  <a className="rn-btn btn-brd mr--30">
                    <span>
                      {" "}
                      আজঃ {todayEvents.length > 0 ? "🎉" : "📅"}{" "}
                      {toBnNumber ? toBnNumber(currentDay) : currentDay}{" "}
                      {BENGALI_MONTHS ? BENGALI_MONTHS[currentMonthIdx] : ""}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {todayEvents.length === 0 ? (
            <div className="p-3 text-muted">
              আজকে বংশের কোনো সদস্যের জন্মদিন, বিবাহ বার্ষিকী বা মৃত্যুবার্ষিকী
              নেই।
            </div>
          ) : (
            <div className="row g-3 mt--100">
              {todayEvents.map((ev) => (
                <TodayEventCard key={ev.id} ev={ev} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodaysEvents;
