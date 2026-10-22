"use client";

import { Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
  { value: "others", label: "অন্যান্য" },
];

const BirthInfoFields = ({ control, register, errors }) => {
  return (
    <>
      {/* Gender */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>লিঙ্গ</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "লিঙ্গ নির্বাচন করুন" }}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                placeholder="লিঙ্গ নির্বাচন করুন"
              />
            )}
          />
          {errors.gender && (
            <small className="text-danger">{errors.gender.message}</small>
          )}
        </div>
      </div>

      {/* Birth Date */}
      <div className="col-lg-3">
        <div className="form-group">
          <label>জন্ম তারিখ</label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="তারিখ নির্বাচন করুন"
              />
            )}
          />
        </div>
      </div>

      {/* Birth Time */}
      <div className="col-lg-3">
        <div className="form-group">
          <label>জন্ম সময়</label>
          <Controller
            name="birthTime"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="সময়"
                dateFormat="hh:mm aa"
                placeholderText="সময় নির্বাচন করুন"
              />
            )}
          />
        </div>
      </div>

      {/* Birth Place */}
      <div className="col-lg-6">
        <div className="form-group">
          <label>জন্মস্থান</label>
          <input
            {...register("birthPlace")}
            className="form-control"
            placeholder="জন্মস্থান"
          />
        </div>
      </div>
    </>
  );
};

export default BirthInfoFields;
