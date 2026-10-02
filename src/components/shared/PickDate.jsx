"use client";

import React from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth, setHours, setMinutes } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: getYear(new Date()) - 1990 + 1 },
  (_, i) => 1990 + i,
);

const PickDate = ({
  selected,
  onChange,
  placeholder = "Select Date",
  className = "form-control",
}) => {
  const excludeTimes = [
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 17),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 30), 19),
  ];

  return (
    <DatePicker
      placeholderText={placeholder}
      selected={selected ? new Date(selected) : null}
      onChange={onChange}
      showTimeSelect
      excludeTimes={excludeTimes}
      timeFormat="hh:mm aa"
      timeIntervals={30}
      dateFormat="dd/MM/yyyy - hh:mm aa"
      className={className}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: "2px 8px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            style={{
              background: "#216ba5",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {"<"}
          </button>

          <select
            className="date-pad"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="date-pad"
            value={MONTHS[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(MONTHS.indexOf(value))
            }
          >
            {MONTHS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            style={{
              background: "#216ba5",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {">"}
          </button>
        </div>
      )}
    />
  );
};

export default PickDate;
