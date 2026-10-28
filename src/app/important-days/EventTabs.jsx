import React from "react";

export default function EventTabs({
  activeTab,
  setActiveTab,
  counts,
  toBnNumber,
}) {
  const tabs = [
    { key: "all", label: "সকল দিনসমূহ", count: counts.all },
    { key: "birthdays", label: "🎂 জন্মদিন", count: counts.birthdays },
    { key: "weddings", label: "💍 বিবাহ বার্ষিকী", count: counts.weddings },
    { key: "deaths", label: "🕊️ মৃত্যুবার্ষিকী", count: counts.deaths },
  ];

  return (
    <div className="col-12">
      <ul className="nav rn-nav-list d-flex flex-wrap" role="tablist">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              type="button"
              className={`nav-link w-100 ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} ({toBnNumber(tab.count)})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
