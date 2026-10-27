"use client";

import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BirthInfoFields = ({ control, register, errors, setValue }) => {
  return (
    <>
      {/* Birth Date & Time (একক কম্পোনেন্টে তারিখ ও সময়) */}
      <div className="col-lg-4 col-md-6">
        <div className="form-group">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="mb-0">জন্ম তারিখ ও সময়</label>
            <span
              className="badge"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "#fff",
                backgroundColor: "rgba(226, 27, 67, 0.50)",
                borderRadius: "4px",
                padding: "5px 8px",
              }}
            >
              তারিখ ও সময়
            </span>
          </div>

          <div className="modern-date-picker-wrap">
            <span className="picker-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="15.5" cy="15.5" r="3.5" />
                <polyline points="15.5 14 15.5 15.5 16.5 16.5" />
              </svg>
            </span>

            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="form-control"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date);
                    if (setValue) {
                      setValue("birthTime", date, { shouldValidate: true });
                    }
                  }}
                  showTimeSelect
                  timeIntervals={15}
                  timeCaption="সময়"
                  dateFormat="dd/MM/yyyy, hh:mm aa"
                  placeholderText="তারিখ ও সময় নির্বাচন করুন"
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  isClearable
                />
              )}
            />
          </div>
          {errors?.birthDate && (
            <small className="text-danger">{errors.birthDate.message}</small>
          )}
        </div>
      </div>

      {/* Birth Place */}
      <div className="col-lg-8">
        <div className="form-group">
          <label>জন্মস্থান</label>
          <input
            {...register("birthPlace")}
            className="form-control"
            placeholder="জন্মস্থান (গ্রাম/শহর)"
          />
        </div>
      </div>
    </>
  );
};

export default BirthInfoFields;
