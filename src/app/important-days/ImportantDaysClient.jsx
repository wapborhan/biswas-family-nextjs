"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

const BENGALI_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const toBnNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

export default function ImportantDaysClient({ members = [] }) {
  const today = useMemo(() => new Date(), []);
  const currentMonthIdx = today.getMonth();
  const currentDay = today.getDate();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIdx);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'birthdays', 'weddings', 'deaths'

  // Extract all life events
  const { allEvents, todayEvents } = useMemo(() => {
    const events = [];
    const seenWeddings = new Set();

    members.forEach((m) => {
      if (!m || !m._id) return;

      const avatar =
        m.profilePic ||
        (m.gender === "female"
          ? "https://freesvg.org/img/Female-Avatar.png"
          : "https://freesvg.org/img/Male-Avatar.png");

      // 1. Birthday
      const bDateStr = m.birth?.dateTime || m.birthDate;
      if (bDateStr) {
        const bDate = new Date(bDateStr);
        if (!isNaN(bDate.getTime())) {
          const bMonth = bDate.getMonth();
          const bDay = bDate.getDate();
          const bYear = bDate.getFullYear();
          const age = today.getFullYear() - bYear;
          const isToday = bMonth === currentMonthIdx && bDay === currentDay;

          events.push({
            id: `birth_${m._id}`,
            type: "birthday",
            title: "জন্মদিন",
            icon: "🎂",
            badgeColor: "bg-success",
            member: m,
            avatar,
            date: bDate,
            month: bMonth,
            day: bDay,
            originalYear: bYear,
            yearsPassed: age > 0 ? age : null,
            milestoneText:
              age > 0 ? `${toBnNumber(age)}তম জন্মদিন` : "জন্মদিন",
            place: m.birth?.place,
            isToday,
            isDeceased: Boolean(m.death?.isDeceased || m.death?.dateTime),
          });
        }
      }

      // 2. Wedding Anniversary
      const wDateStr = m.wedding?.dateTime;
      if (wDateStr) {
        const wDate = new Date(wDateStr);
        if (!isNaN(wDate.getTime())) {
          const wMonth = wDate.getMonth();
          const wDay = wDate.getDate();
          const wYear = wDate.getFullYear();
          const years = today.getFullYear() - wYear;
          const isToday = wMonth === currentMonthIdx && wDay === currentDay;

          // Deduplicate if wedding links two members in the system
          const rawSpouse = m.wedding?.spouseId;
          const spouseId =
            rawSpouse && typeof rawSpouse === "object"
              ? rawSpouse._id
              : rawSpouse || null;

          const coupleKey = spouseId
            ? [m._id, spouseId].sort().join("_")
            : `${m._id}_wedding_${wMonth}_${wDay}`;

          if (!seenWeddings.has(coupleKey)) {
            seenWeddings.add(coupleKey);

            const spouseObj = spouseId
              ? members.find((x) => x._id == spouseId)
              : null;

            const spouseName =
              spouseObj?.fullName ||
              (rawSpouse && typeof rawSpouse === "object"
                ? rawSpouse.fullName
                : null) ||
              (m.spousesIds?.length
                ? typeof m.spousesIds[0] === "object"
                  ? m.spousesIds[0]?.fullName
                  : members.find((x) => x._id == m.spousesIds[0])?.fullName
                : null);

            events.push({
              id: `wedding_${m._id}`,
              type: "wedding",
              title: "বিবাহ বার্ষিকী",
              icon: "💍",
              badgeColor: "bg-primary",
              member: m,
              spouse: spouseObj,
              spouseName,
              avatar,
              date: wDate,
              month: wMonth,
              day: wDay,
              originalYear: wYear,
              yearsPassed: years > 0 ? years : null,
              milestoneText:
                years > 0
                  ? `${toBnNumber(years)}তম বিবাহ বার্ষিকী`
                  : "বিবাহ বার্ষিকী",
              place: m.wedding?.place,
              isToday,
            });
          }
        }
      }

      // 3. Death Anniversary
      const dDateStr = m.death?.dateTime || m.deathDate;
      if (dDateStr || m.death?.isDeceased) {
        if (dDateStr) {
          const dDate = new Date(dDateStr);
          if (!isNaN(dDate.getTime())) {
            const dMonth = dDate.getMonth();
            const dDay = dDate.getDate();
            const dYear = dDate.getFullYear();
            const years = today.getFullYear() - dYear;
            const isToday = dMonth === currentMonthIdx && dDay === currentDay;

            events.push({
              id: `death_${m._id}`,
              type: "death",
              title: "মৃত্যুবার্ষিকী",
              icon: "🕊️",
              badgeColor: "bg-secondary",
              member: m,
              avatar,
              date: dDate,
              month: dMonth,
              day: dDay,
              originalYear: dYear,
              yearsPassed: years > 0 ? years : null,
              milestoneText:
                years > 0
                  ? `${toBnNumber(years)}তম মৃত্যুবার্ষিকী`
                  : "মৃত্যুবার্ষিকী",
              place: m.death?.place,
              burialPlace: m.death?.burialPlace,
              isToday,
            });
          }
        }
      }
    });

    const todays = events.filter((e) => e.isToday);
    return { allEvents: events, todayEvents: todays };
  }, [members, today, currentMonthIdx, currentDay]);

  // Filter events by selected month
  const monthEvents = useMemo(() => {
    return allEvents
      .filter((e) => e.month === selectedMonth)
      .sort((a, b) => a.day - b.day);
  }, [allEvents, selectedMonth]);

  // Tabbed filtering
  const filteredEvents = useMemo(() => {
    if (activeTab === "birthdays")
      return monthEvents.filter((e) => e.type === "birthday");
    if (activeTab === "weddings")
      return monthEvents.filter((e) => e.type === "wedding");
    if (activeTab === "deaths")
      return monthEvents.filter((e) => e.type === "death");
    return monthEvents;
  }, [monthEvents, activeTab]);

  const counts = useMemo(() => {
    const b = monthEvents.filter((e) => e.type === "birthday").length;
    const w = monthEvents.filter((e) => e.type === "wedding").length;
    const d = monthEvents.filter((e) => e.type === "death").length;
    return { all: monthEvents.length, birthdays: b, weddings: w, deaths: d };
  }, [monthEvents]);

  return (
    <div className="rn-service-area rn-section-gap section-separator pt--40">
      <div className="container">
        {/* Page Title */}
        <div className="row mb--40">
          <div className="col-12 text-center">
            <span className="subtitle text-primary font-weight-bold">
              পারিবারিক স্মৃতি ও স্মরণীয় দিন
            </span>
            <h2 className="title mb-2">গুরুত্বপূর্ণ দিনসমূহ</h2>
            <p className="text-muted">
              বংশের সকল সদস্যদের জন্মদিন, বিবাহ বার্ষিকী ও মৃত্যুবার্ষিকী
            </p>
          </div>
        </div>

        {/* 🌟 1. ACTIVE TODAY BANNER / HERO SECTION 🌟 */}
        <div className="row mb--50">
          <div className="col-12">
            <div
              className={`card border-0 shadow-sm rounded-4 p-4 ${
                todayEvents.length > 0
                  ? "bg-gradient text-white"
                  : "bg-light text-dark"
              }`}
              style={{
                background:
                  todayEvents.length > 0
                    ? "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
                    : "#f8f9fa",
                borderLeft:
                  todayEvents.length > 0 ? "6px solid #ff758c" : "6px solid #6c757d",
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "24px" }}>
                    {todayEvents.length > 0 ? "🎉" : "📅"}
                  </span>
                  <h4
                    className={`mb-0 font-weight-bold ${
                      todayEvents.length > 0 ? "text-white" : "text-dark"
                    }`}
                  >
                    আজকের বিশেষ দিনসমূহ (Today's Events)
                  </h4>
                </div>
                <span
                  className={`badge ${
                    todayEvents.length > 0 ? "bg-warning text-dark" : "bg-secondary"
                  } p-2 px-3`}
                  style={{ fontSize: "14px" }}
                >
                  আজঃ {toBnNumber(currentDay)}{" "}
                  {BENGALI_MONTHS[currentMonthIdx]}
                </span>
              </div>

              {todayEvents.length === 0 ? (
                <div className="p-3 text-muted">
                  আজকে বংশের কোনো সদস্যের জন্মদিন, বিবাহ বার্ষিকী বা মৃত্যুবার্ষিকী নেই।
                </div>
              ) : (
                <div className="row g-3 mt-1">
                  {todayEvents.map((ev) => (
                    <div className="col-lg-6 col-12" key={ev.id}>
                      <div className="bg-white text-dark p-3 rounded shadow-sm d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <Link href={`/member/${ev.member._id}`}>
                            <img
                              src={ev.avatar}
                              alt={ev.member.fullName}
                              className="rounded-circle border"
                              style={{
                                width: "65px",
                                height: "65px",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                          <div>
                            <span
                              className={`badge ${ev.badgeColor} text-white mb-1`}
                              style={{ fontSize: "11px" }}
                            >
                              {ev.icon} {ev.milestoneText}
                            </span>
                            <h5 className="mb-0">
                              <Link
                                href={`/member/${ev.member._id}`}
                                className="text-dark font-weight-bold"
                              >
                                {ev.member.fullName}
                              </Link>
                            </h5>
                            {ev.type === "wedding" && ev.spouseName && (
                              <div className="small text-muted">
                                ও {ev.spouseName}
                              </div>
                            )}
                            {ev.type === "birthday" && ev.isDeceased && (
                              <span className="small text-secondary">
                                (প্রয়াত সদস্যের জন্মবার্ষিকী)
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/member/${ev.member._id}`}
                          className="btn btn-sm btn-outline-primary ms-2"
                        >
                          প্রোফাইল
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🗓️ 2. MONTH SELECTOR & TAB NAVIGATION 🗓️ */}
        <div className="row mb--30 align-items-center">
          {/* Month Selector */}
          <div className="col-lg-5 col-12 mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-2">
              <label className="fw-bold mb-0 text-nowrap">মাস নির্বাচন করুনঃ</label>
              <select
                className="form-select bg-white shadow-sm border py-2"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                style={{ cursor: "pointer", fontWeight: "600" }}
              >
                {BENGALI_MONTHS.map((name, idx) => (
                  <option key={name} value={idx}>
                    {name} {idx === currentMonthIdx ? "(চলতি মাস)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Month Switch buttons (Prev / Next / This Month) */}
          <div className="col-lg-7 col-12 d-flex justify-content-lg-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
              }
            >
              ◀ পূর্ববর্তী মাস
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                selectedMonth === currentMonthIdx
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setSelectedMonth(currentMonthIdx)}
            >
              চলতি মাস ({BENGALI_MONTHS[currentMonthIdx]})
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
              }
            >
              পরবর্তী মাস ▶
            </button>
          </div>
        </div>

        {/* 📑 3. TABBED EVENT FILTERS 📑 */}
        <div className="row mb--40">
          <div className="col-12">
            <ul className="nav rn-nav-list d-flex flex-wrap" role="tablist">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link w-100 ${
                    activeTab === "all" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  সকল দিনসমূহ ({toBnNumber(counts.all)})
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link w-100 ${
                    activeTab === "birthdays" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("birthdays")}
                >
                  🎂 জন্মদিন ({toBnNumber(counts.birthdays)})
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link w-100 ${
                    activeTab === "weddings" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("weddings")}
                >
                  💍 বিবাহ বার্ষিকী ({toBnNumber(counts.weddings)})
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link w-100 ${
                    activeTab === "deaths" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("deaths")}
                >
                  🕊️ মৃত্যুবার্ষিকী ({toBnNumber(counts.deaths)})
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 📇 4. EVENT CARDS LISTING 📇 */}
        <div className="row g-4">
          {filteredEvents.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div className="bg-white p-5 rounded-4 shadow-sm border">
                <div style={{ fontSize: "40px" }} className="mb-2">
                  🍃
                </div>
                <h5 className="text-dark mb-1">
                  {BENGALI_MONTHS[selectedMonth]} মাসে কোনো{" "}
                  {activeTab === "birthdays"
                    ? "জন্মদিনের"
                    : activeTab === "weddings"
                    ? "বিবাহ বার্ষিকীর"
                    : activeTab === "deaths"
                    ? "মৃত্যুবার্ষিকীর"
                    : "বিশেষ দিনের"}{" "}
                  রেকর্ড নেই
                </h5>
                <p className="text-muted small mb-0">
                  অন্য কোনো মাস নির্বাচন করে দেখতে পারেন।
                </p>
              </div>
            </div>
          ) : (
            filteredEvents.map((ev) => (
              <div className="col-lg-4 col-md-6 col-12" key={ev.id}>
                <div
                  className={`card h-100 border p-4 rounded-4 shadow-sm bg-white transition-all ${
                    ev.isToday ? "border-primary" : ""
                  }`}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderTop: ev.isToday
                      ? "4px solid #0d6efd"
                      : "4px solid #e9ecef",
                  }}
                >
                  {/* Today Badge */}
                  {ev.isToday && (
                    <span
                      className="badge bg-danger position-absolute"
                      style={{ top: "12px", right: "12px", fontSize: "11px" }}
                    >
                      আজকের দিন! 🎯
                    </span>
                  )}

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Link href={`/member/${ev.member._id}`}>
                      <img
                        src={ev.avatar}
                        alt={ev.member.fullName}
                        className="rounded-circle border"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <div>
                      <span
                        className={`badge ${ev.badgeColor} text-white mb-1`}
                        style={{ fontSize: "11px" }}
                      >
                        {ev.icon} {ev.title}
                      </span>
                      <h5 className="mb-0">
                        <Link
                          href={`/member/${ev.member._id}`}
                          className="text-dark font-weight-bold"
                        >
                          {ev.member.fullName}
                        </Link>
                      </h5>
                      {ev.type === "wedding" && ev.spouseName && (
                        <div className="small text-muted">
                          সঙ্গীঃ {ev.spouseName}
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="my-2 text-muted" />

                  {/* Event Details */}
                  <div className="d-flex flex-column gap-2 mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">তারিখঃ</span>
                      <span className="fw-bold text-dark">
                        {toBnNumber(ev.day)} {BENGALI_MONTHS[ev.month]}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">উপলব্ধিঃ</span>
                      <span className="badge bg-light text-primary border">
                        {ev.milestoneText}
                      </span>
                    </div>

                    {ev.place && (
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">স্থানঃ</span>
                        <span className="text-truncate text-dark small" style={{ maxWidth: "160px" }}>
                          {ev.place}
                        </span>
                      </div>
                    )}

                    {ev.burialPlace && (
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">সমাধিস্থলঃ</span>
                        <span className="text-truncate text-dark small" style={{ maxWidth: "160px" }}>
                          {ev.burialPlace}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2 border-top d-flex justify-content-end">
                    <Link
                      href={`/member/${ev.member._id}`}
                      className="btn btn-sm btn-outline-primary w-100"
                    >
                      প্রোফাইল দেখুন ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
