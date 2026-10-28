import Link from "next/link";
import React from "react";

const EventCard = ({ ev, toBnNumber, BENGALI_MONTHS }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12" key={ev.id}>
      <div
        className={`card h-100 border p-4 rounded-4 shadow-sm bg-white transition-all ${
          ev.isToday ? "border-danger" : ""
        }`}
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: ev.isToday ? "4px solid #0d6efd" : "4px solid #e9ecef",
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
              <div className="small text-muted">সঙ্গীঃ {ev.spouseName}</div>
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
              <span
                className="text-truncate text-dark small"
                style={{ maxWidth: "160px" }}
              >
                {ev.place}
              </span>
            </div>
          )}

          {ev.burialPlace && (
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">সমাধিস্থলঃ</span>
              <span
                className="text-truncate text-dark small"
                style={{ maxWidth: "160px" }}
              >
                {ev.burialPlace}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-2 border-top d-flex justify-content-end">
          <Link
            href={`/member/${ev.member._id}`}
            className="rn-btn btn-sm btn-outline-primary w-100"
          >
            প্রোফাইল দেখুন ➔
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
