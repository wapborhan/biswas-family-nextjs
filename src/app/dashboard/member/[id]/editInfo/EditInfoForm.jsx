"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalSelect from "@/components/shared/GlobalSelect";

const genderOptions = [
  { value: "male", label: "পুরুষ (Male)" },
  { value: "female", label: "মহিলা (Female)" },
  { value: "other", label: "অন্যান্য (Other)" },
];

const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
].map((bg) => ({ value: bg, label: bg }));

export default function EditInfoForm({ member }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: member?.fullName || "",
      gender: member?.gender || "male",
      bloodGroup: member?.bloodGroup || "",
      profilePic: member?.profilePic || "",
      isClanRoot: Boolean(member?.isClanRoot),
      isApproved: Boolean(member?.isApproved),
      birth: {
        dateTime: member?.birth?.dateTime
          ? new Date(member.birth.dateTime)
          : null,
        place: member?.birth?.place || "",
      },
      death: {
        isDeceased: Boolean(
          member?.death?.isDeceased || member?.death?.dateTime,
        ),
        dateTime: member?.death?.dateTime
          ? new Date(member.death.dateTime)
          : null,
        place: member?.death?.place || "",
        burialPlace: member?.death?.burialPlace || "",
      },
    },
  });

  const isDeceased = watch("death.isDeceased");

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      fullName: data.fullName?.trim(),
      gender:
        typeof data.gender === "object" ? data.gender?.value : data.gender,
      bloodGroup:
        typeof data.bloodGroup === "object"
          ? data.bloodGroup?.value
          : data.bloodGroup || "",
      profilePic: data.profilePic?.trim() || "",
      isClanRoot: Boolean(data.isClanRoot),
      isApproved: Boolean(data.isApproved),
      birth: {
        dateTime: data.birth?.dateTime ? new Date(data.birth.dateTime) : null,
        place: data.birth?.place?.trim() || "",
      },
      death: {
        isDeceased: Boolean(data.death?.isDeceased),
        dateTime:
          data.death?.isDeceased && data.death?.dateTime
            ? new Date(data.death.dateTime)
            : null,
        place: data.death?.isDeceased ? data.death?.place?.trim() || "" : "",
        burialPlace: data.death?.isDeceased
          ? data.death?.burialPlace?.trim() || ""
          : "",
      },
    };

    try {
      const res = await fetch(`/api/member/${member._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(
          result.error || result.message || "ব্যক্তিগত তথ্য আপডেট ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "ব্যক্তিগত বিবরণ সফলভাবে আপডেট করা হয়েছে!",
      });
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message: err.message || "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3 p-4">
      {feedback && (
        <div className="col-12">
          <div
            className={`alert ${
              feedback.type === "success" ? "alert-success" : "alert-danger"
            } d-flex justify-content-between align-items-center shadow-sm`}
            role="alert"
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setFeedback(null)}
            ></button>
          </div>
        </div>
      )}

      <div className="col-12 border-bottom pb-2 mb-2">
        <h4 className="text-dark font-weight-bold mb-1">ব্যক্তিগত বিবরণ (Personal Info)</h4>
        <p className="text-muted small mb-0">সদস্যের নাম, লিঙ্গ, রক্তের গ্রুপ ও জন্ম/মৃত্যুর তথ্য</p>
      </div>

      {/* Full Name */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>সম্পূর্ণ নাম *</label>
          <input
            {...register("fullName", { required: "সম্পূর্ণ নাম আবশ্যক" })}
            className="form-control"
            placeholder="সদস্যের পুরো নাম"
          />
          {errors.fullName && (
            <small className="text-danger">{errors.fullName.message}</small>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>লিঙ্গ *</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "লিঙ্গ নির্বাচন করুন" }}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={genderOptions}
                value={genderOptions.find((g) => g.value === field.value)}
                onChange={(val) => field.onChange(val ? val.value : "")}
                placeholder="লিঙ্গ নির্বাচন করুন"
              />
            )}
          />
          {errors.gender && (
            <small className="text-danger">{errors.gender.message}</small>
          )}
        </div>
      </div>

      {/* Blood Group */}
      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>রক্তের গ্রুপ</label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={bloodGroupOptions}
                value={
                  bloodGroupOptions.find((b) => b.value === field.value) || null
                }
                onChange={(val) => field.onChange(val ? val.value : "")}
                placeholder="রক্তের গ্রুপ"
                isClearable
              />
            )}
          />
        </div>
      </div>

      {/* Profile Picture */}
      <div className="col-lg-8 col-12">
        <div className="form-group">
          <label>প্রোফাইল ছবির লিংক (URL)</label>
          <input
            {...register("profilePic")}
            className="form-control"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      {/* Status Checkboxes */}
      <div className="col-lg-4 col-12 d-flex flex-column justify-content-center">
        <div className="form-check mb-2">
          <input
            type="checkbox"
            id="isClanRoot"
            {...register("isClanRoot")}
            className="form-check-input"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label
            htmlFor="isClanRoot"
            className="form-check-label ms-2"
            style={{ cursor: "pointer" }}
          >
            বংশের আদি পুরুষ (Clan Root)
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="isApproved"
            {...register("isApproved")}
            className="form-check-input"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label
            htmlFor="isApproved"
            className="form-check-label ms-2 text-success font-weight-bold"
            style={{ cursor: "pointer" }}
          >
            অনুমোদিত সদস্য (Approved)
          </label>
        </div>
      </div>

      {/* Birth Date & Place */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>জন্ম তারিখ ও সময়</label>
          <Controller
            name="birth.dateTime"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                timeIntervals={15}
                timeCaption="সময়"
                dateFormat="dd/MM/yyyy, hh:mm aa"
                placeholderText="জন্ম তারিখ ও সময়"
                maxDate={new Date()}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="form-control"
                isClearable
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>জন্মস্থান</label>
          <input
            {...register("birth.place")}
            className="form-control"
            placeholder="জন্মস্থান (গ্রাম/শহর)"
          />
        </div>
      </div>

      {/* Deceased Status Toggle */}
      <div className="col-12 mt-3">
        <div className="form-check form-switch p-3 bg-light rounded border">
          <input
            type="checkbox"
            className="form-check-input ms-0 me-2"
            id="isDeceased"
            {...register("death.isDeceased")}
            style={{ cursor: "pointer", width: "2em", height: "1.1em" }}
          />
          <label
            htmlFor="isDeceased"
            className="form-check-label fw-bold text-dark ps-2"
            style={{ cursor: "pointer" }}
          >
            সদস্য প্রয়াত / ইন্তেকাল করেছেন (Mark as Deceased)
          </label>
          <div className="text-muted small ps-2 mt-1">
            সদস্য যদি মৃত্যুবরণ করে থাকেন তবে এটি সিলেক্ট করুন। মৃত্যুর সঠিক তারিখ জানা না থাকলেও প্রয়াত হিসেবে রেকর্ড থাকবে।
          </div>
        </div>
      </div>

      {/* Death Details (Conditional) */}
      {isDeceased && (
        <>
          <div className="col-lg-4 col-12">
            <div className="form-group">
              <label>মৃত্যুর তারিখ (জানা থাকলে)</label>
              <Controller
                name="death.dateTime"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="মৃত্যুর তারিখ"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    className="form-control"
                    isClearable
                  />
                )}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="form-group">
              <label>মৃত্যুর স্থান (Place of Death)</label>
              <input
                {...register("death.place")}
                className="form-control"
                placeholder="হাসপাতাল / শহর / দেশ"
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="form-group">
              <label>দাফন / সমাধিস্থল (Burial / Cemetery)</label>
              <input
                {...register("death.burialPlace")}
                className="form-control"
                placeholder="পারিবারিক কবরস্থান / মাজার"
              />
            </div>
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary px-5"
          disabled={submitting}
        >
          {submitting ? "সংরক্ষণ হচ্ছে..." : "ব্যক্তিগত তথ্য আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}
