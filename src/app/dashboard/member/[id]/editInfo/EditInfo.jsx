"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useMemo } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import PickDate from "@/components/shared/PickDate";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditInfo = ({ malemembers }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  /* ---------------- FATHER OPTIONS ---------------- */
  const fatherOptions = useMemo(
    () =>
      malemembers.map((member) => ({
        value: member._id,
        label: member.name,
      })),
    [malemembers],
  );

  /* ---------------- WATCH FATHER ---------------- */
  const selectedFather = watch("father");

  /* ---------------- MOTHER OPTIONS (DEPENDENT) ---------------- */
  const motherOptions = useMemo(() => {
    if (!selectedFather) return [];

    const father = malemembers.find((m) => m._id === selectedFather.value);

    if (!father?.spousesIds) return [];

    return father.spousesIds.map((wife) => ({
      value: wife._id,
      label: wife.name,
    }));
  }, [selectedFather, malemembers]);

  const onSubmit = (data) => {
    console.log("FORM DATA 👉", {
      ...data,
      fatherId: data.father?.value,
      motherId: data.mother?.value,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row rwt-dynamic-form mt-5 form-wrap p-5"
    >
      {/* NAME */}
      <div className="col-lg-8">
        <div className="form-group">
          <label>নাম</label>
          <input
            {...register("name", { required: "নাম আবশ্যক" })}
            className="form-control"
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>
      </div>
      {/* GENDER */}
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
                classNamePrefix="select-input"
              />
            )}
          />
          {errors.gender && (
            <small className="text-danger">{errors.gender.message}</small>
          )}
        </div>
      </div>{" "}
      {/* FATHER */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>পিতা</label>
          <Controller
            name="father"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={fatherOptions}
                placeholder="পিতা নির্বাচন করুন"
                classNamePrefix="select-input"
                isClearable
                onChange={(val) => {
                  field.onChange(val);
                  setValue("mother", null); // 🔥 reset mother
                }}
              />
            )}
          />
        </div>
      </div>
      {/* MOTHER (FILTERED BY FATHER) */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>মাতা</label>
          <Controller
            name="mother"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={motherOptions}
                classNamePrefix="select-input"
                placeholder={
                  selectedFather
                    ? "মাতা নির্বাচন করুন"
                    : "আগে পিতা নির্বাচন করুন"
                }
                isDisabled={!selectedFather}
                isClearable
              />
            )}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="form-group">
          <label>রক্তের গ্রুপ</label>

          <Controller
            name="bloodGroup"
            control={control}
            rules={{ required: "রক্তের গ্রুপ নির্বাচন করুন" }}
            render={({ field }) => (
              <Select
                options={bloodGroups.map((b) => ({
                  value: b,
                  label: b,
                }))}
                placeholder="রক্তের গ্রুপ নির্বাচন করুন"
                classNamePrefix="select-input"
                value={bloodGroups
                  .map((b) => ({
                    value: b,
                    label: b,
                  }))
                  .find((option) => option.value === field.value)}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
              />
            )}
          />

          {errors.bloodGroup && (
            <small className="text-danger">{errors.bloodGroup.message}</small>
          )}
        </div>
      </div>
      {/* BIRTH DATE */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>জন্ম তারিখ ও সময়</label>
          <Controller
            name="birth.dateTime"
            control={control}
            render={({ field }) => (
              <PickDate
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholder="Birth Date & Time"
              />
            )}
          />
        </div>
      </div>
      <div className="col-lg-8">
        <div className="form-group">
          <label>জন্মস্থান</label>
          <input {...register("birthPlace")} className="form-control" />
        </div>
      </div>
      {/* ADDRESS */}
      <div className="col-lg-12">
        <div className="form-group">
          <label>বর্তমান ঠিকানা</label>
          <input {...register("presentAddress")} className="form-control" />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="form-group">
          <label>স্থায়ী ঠিকানা</label>
          <input {...register("permanentAddress")} className="form-control" />
        </div>
      </div>
      {/* BUTTON */}
      <div className="col-12 mt-5">
        <button type="submit" className="rn-btn w-100">
          <span>ব্যক্তিগত বিবরণ আপডেট করুণ</span>
        </button>
      </div>
    </form>
  );
};

export default EditInfo;
