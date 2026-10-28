"use client";

import React, { useState, useMemo } from "react";
import { BENGALI_MONTHS, toBnNumber } from "./constants";
import ImportantDaysHeader from "./ImportantDaysHeader";
import TodaysEvents from "./TodaysEvents";
import MonthSelector from "./MonthSelector";
import EventTabs from "./EventTabs";
import EventsList from "./EventsList";

export { BENGALI_MONTHS, toBnNumber };

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
            milestoneText: age > 0 ? `${toBnNumber(age)}তম জন্মদিন` : "জন্মদিন",
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
    <div className="rn-resume-area rn-section-gap section-separator pt--40 mt--90 sr-content">
      <div className="container">
        {/* 1. Page Header */}
        <ImportantDaysHeader />

        {/* 2. Today's Events Banner */}
        <TodaysEvents
          todayEvents={todayEvents}
          toBnNumber={toBnNumber}
          BENGALI_MONTHS={BENGALI_MONTHS}
          currentDay={currentDay}
          currentMonthIdx={currentMonthIdx}
        />

        {/* 3. Month Selector */}
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          currentMonthIdx={currentMonthIdx}
          BENGALI_MONTHS={BENGALI_MONTHS}
        />
        <div className="row mb--40 important-days-tabs sect-main">
          {/* 4. Tabbed Event Filters */}
          <EventTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={counts}
            toBnNumber={toBnNumber}
          />

          {/* 5. Event Cards Listing */}
          <EventsList
            filteredEvents={filteredEvents}
            selectedMonth={selectedMonth}
            activeTab={activeTab}
            BENGALI_MONTHS={BENGALI_MONTHS}
            toBnNumber={toBnNumber}
          />
        </div>
      </div>
    </div>
  );
}
