import React from "react";

export default function MonthSelector({
  selectedMonth,
  setSelectedMonth,
  currentMonthIdx,
  BENGALI_MONTHS,
}) {
  return (
    <div className="row mb--30 align-items-center sect-main">
      {/* Month Selector */}
      <div className="col-lg-5 col-12 mb-3 mb-lg-0">
        <div className="d-flex align-items-center gap-2">
          <label className="fw-bold mb-0 text-nowrap">মাস নির্বাচন করুনঃ</label>
          <select
            className="form-select bg-white shadow-sm border py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            style={{ cursor: "pointer", fontWeight: "600", fontSize: "1.5rem" }}
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
          className="rn-btn"
          onClick={() =>
            setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
        >
          ◀ পূর্ববর্তী মাস
        </button>
        <button
          type="button"
          className={`rn-btn ${
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
          className="rn-btn"
          onClick={() =>
            setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
          }
        >
          পরবর্তী মাস ▶
        </button>
      </div>
    </div>
  );
}
