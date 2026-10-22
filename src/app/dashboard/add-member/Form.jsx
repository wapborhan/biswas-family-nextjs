"use client";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
];

const Form = ({ malemembers }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  /* ---------------- WATCH CLAN ROOT ---------------- */
  const isClanRoot = watch("isClanRoot");

  /* ---------------- RESET FIELDS ON CLAN ROOT CHANGE ---------------- */
  useEffect(() => {
    if (isClanRoot) {
      setValue("father", null);
      setValue("mother", null);
    } else {
      setValue("fatherName", "");
      setValue("motherName", "");
    }
  }, [isClanRoot, setValue]);

  /* ---------------- FATHER OPTIONS ---------------- */
  const fatherOptions = useMemo(
    () =>
      malemembers.map((member) => ({
        value: member._id,
        label: member.fullName,
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
      label: wife.fullName,
    }));
  }, [selectedFather, malemembers]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    // Format birth dateTime
    let birthDateTime = null;
    if (data.birthDate) {
      const d = new Date(data.birthDate);
      if (data.birthTime) {
        const t = new Date(data.birthTime);
        d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
      }
      birthDateTime = d;
    }

    const payload = {
      fullName: data.name?.trim(),
      gender:
        typeof data.gender === "object" ? data.gender?.value : data.gender,
      isClanRoot: !data.isClanRoot,
      fatherId: data.isClanRoot
        ? data.fatherName?.trim() || null
        : data.father?.value || null,
      motherId: data.isClanRoot
        ? data.motherName?.trim() || null
        : data.mother?.value || null,
      birth: {
        dateTime: birthDateTime,
        place: data.birthPlace?.trim() || "",
      },
      address: {
        present: {
          village: data.presentAddress?.trim() || "",
        },
        permanent: {
          village: data.permanentAddress?.trim() || "",
        },
      },
    };

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || result.message || "সদস্য যুক্ত করতে ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "সদস্য সফলভাবে যুক্ত করা হয়েছে!",
      });

      // Reset form
      reset();
      router.refresh();
    } catch (err) {
      console.error("Submit error:", err);
      setFeedback({
        type: "error",
        message: err.message || "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row rwt-dynamic-form mt-5 form-wrap p-5"
    >
      {/* NAME */}
      <div className="col-lg-12">
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
      <div className="col-lg-12">
        <div className="form-group d-flex align-items-center mb-3">
          <input
            type="checkbox"
            id="isClanRoot"
            {...register("isClanRoot")}
            style={{
              width: "18px !important",
              height: "18px !important",
              cursor: "pointer",
              marginRight: "10px",
              border: "1px solid #b2b2b2 !important",
              outline: "1px solid #b2b2b2 !important",
              opacity: "1 !important",
            }}
          />
          <label
            htmlFor="isClanRoot"
            style={{
              cursor: "pointer",
              marginBottom: 0,
              color: "#878e99",
            }}
          >
            বংশের আদি পুরুষ অথবা বংশের বাইরের সদস্য (Clan Root)
          </label>
        </div>
      </div>
      {/* FATHER */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>পিতা</label>
          {isClanRoot ? (
            <input
              type="text"
              {...register("fatherName")}
              className="form-control"
              placeholder="পিতার নাম লিখুন"
            />
          ) : (
            <Controller
              name="father"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={fatherOptions}
                  placeholder="পিতা নির্বাচন করুন"
                  isClearable
                  onChange={(val) => {
                    field.onChange(val);
                    setValue("mother", null); // 🔥 reset mother
                  }}
                />
              )}
            />
          )}
        </div>
      </div>

      {/* MOTHER (FILTERED BY FATHER OR TEXT INPUT) */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>মাতা</label>
          {isClanRoot ? (
            <input
              type="text"
              {...register("motherName")}
              className="form-control"
              placeholder="মাতার নাম লিখুন"
            />
          ) : (
            <Controller
              name="mother"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={motherOptions}
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
              />
            )}
          />
          {errors.gender && (
            <small className="text-danger">{errors.gender.message}</small>
          )}
        </div>
      </div>

      {/* BIRTH DATE */}
      <div className="col-lg-4">
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

      {/* BIRTH TIME */}
      <div className="col-lg-4">
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

      {/* BIRTH PLACE */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>জন্মস্থান</label>
          <input {...register("birthPlace")} className="form-control" />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="col-lg-6">
        <div className="form-group">
          <label>বর্তমান ঠিকানা</label>
          <input {...register("presentAddress")} className="form-control" />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="form-group">
          <label>স্থায়ী ঠিকানা</label>
          <input {...register("permanentAddress")} className="form-control" />
        </div>
      </div>

      {/* FEEDBACK BANNER */}
      {feedback && (
        <div className="col-12 mt-4">
          <div
            className={`alert ${
              feedback.type === "success" ? "alert-success" : "alert-danger"
            }`}
            style={{
              padding: "12px 20px",
              borderRadius: "6px",
              backgroundColor:
                feedback.type === "success"
                  ? "rgba(40, 167, 69, 0.15)"
                  : "rgba(220, 53, 69, 0.15)",
              border: `1px solid ${
                feedback.type === "success" ? "#28a745" : "#dc3545"
              }`,
              color: feedback.type === "success" ? "#28a745" : "#dc3545",
              fontSize: "16px",
            }}
          >
            {feedback.message}
          </div>
        </div>
      )}

      {/* BUTTON */}
      <div className="col-12 mt-4">
        <button
          type="submit"
          className="rn-btn w-100"
          disabled={submitting}
          style={{
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          <span>
            {submitting ? "সংরক্ষণ করা হচ্ছে..." : "সদস্য যুক্ত করুণ"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default Form;
