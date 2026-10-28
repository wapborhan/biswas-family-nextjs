import React from "react";
import EventCard from "@/components/shared/EventCard";

export default function EventsList({
  filteredEvents = [],
  selectedMonth,
  activeTab,
  BENGALI_MONTHS,
  toBnNumber,
}) {
  const getTabLabel = () => {
    switch (activeTab) {
      case "birthdays":
        return "জন্মদিনের";
      case "weddings":
        return "বিবাহ বার্ষিকীর";
      case "deaths":
        return "মৃত্যুবার্ষিকীর";
      default:
        return "বিশেষ দিনের";
    }
  };

  return (
    <div className="mt--40">
      <div className="row g-4">
        {filteredEvents.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="bg-white p-5 rounded-4 shadow-sm border">
              <div style={{ fontSize: "40px" }} className="mb-2">
                🍃
              </div>
              <h5 className="text-dark mb-1">
                {BENGALI_MONTHS[selectedMonth]} মাসে কোনো {getTabLabel()} রেকর্ড
                নেই
              </h5>
              <p className="text-muted small mb-0">
                অন্য কোনো মাস নির্বাচন করে দেখতে পারেন।
              </p>
            </div>
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <EventCard
              ev={ev}
              key={ev.id}
              toBnNumber={toBnNumber}
              BENGALI_MONTHS={BENGALI_MONTHS}
            />
          ))
        )}
      </div>
    </div>
  );
}
