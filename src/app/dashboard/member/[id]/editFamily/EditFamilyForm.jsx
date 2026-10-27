"use client";

import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlobalSelect from "@/components/shared/GlobalSelect";

export default function EditFamilyForm({ member, allMembers = [] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const isInitialClanRoot = Boolean(member?.isClanRoot);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      isClanRoot: isInitialClanRoot,
      fatherName:
        isInitialClanRoot && typeof member?.fatherId === "string"
          ? member.fatherId
          : "",
      motherName:
        isInitialClanRoot && typeof member?.motherId === "string"
          ? member.motherId
          : "",

      fatherId:
        !isInitialClanRoot && member?.fatherId
          ? typeof member.fatherId === "object"
            ? member.fatherId._id
            : member.fatherId
          : null,
      motherId:
        !isInitialClanRoot && member?.motherId
          ? typeof member.motherId === "object"
            ? member.motherId._id
            : member.motherId
          : null,

      spousesIds:
        member?.spousesIds?.map((s) => (typeof s === "object" ? s._id : s)) ||
        [],
      childrensIds:
        member?.childrensIds?.map((c) => (typeof c === "object" ? c._id : c)) ||
        [],

      wedding: {
        spouseId: member?.wedding?.spouseId
          ? typeof member.wedding.spouseId === "object"
            ? member.wedding.spouseId._id
            : member.wedding.spouseId
          : null,
        dateTime: member?.wedding?.dateTime
          ? new Date(member.wedding.dateTime)
          : null,
        place: member?.wedding?.place || "",
      },
    },
  });

  const isClanRoot = watch("isClanRoot");
  const selectedFatherId = watch("fatherId");

  const otherMembers = useMemo(
    () => allMembers.filter((m) => m._id !== member?._id),
    [allMembers, member?._id],
  );

  const fatherOptions = useMemo(
    () =>
      otherMembers
        .filter((m) => m.gender === "male")
        .map((m) => ({ value: m._id, label: m.fullName })),
    [otherMembers],
  );

  const motherOptions = useMemo(() => {
    if (!selectedFatherId) {
      return otherMembers
        .filter((m) => m.gender === "female")
        .map((m) => ({ value: m._id, label: m.fullName }));
    }

    const fatherObj = allMembers.find((m) => m._id === selectedFatherId);
    if (fatherObj?.spousesIds?.length) {
      const spouseIds = fatherObj.spousesIds.map((s) =>
        typeof s === "object" ? s._id : s,
      );
      return allMembers
        .filter((m) => spouseIds.includes(m._id))
        .map((m) => ({ value: m._id, label: m.fullName }));
    }

    return otherMembers
      .filter((m) => m.gender === "female")
      .map((m) => ({ value: m._id, label: m.fullName }));
  }, [selectedFatherId, otherMembers, allMembers]);

  const memberSelectOptions = useMemo(
    () =>
      otherMembers.map((m) => ({
        value: m._id,
        label: `${m.fullName} (${m.gender === "male" ? "পুরুষ" : "মহিলা"})`,
      })),
    [otherMembers],
  );

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    const formatIdList = (list) => {
      if (!Array.isArray(list)) return [];
      return list
        .map((item) => (typeof item === "object" ? item?.value : item))
        .filter(Boolean);
    };

    const payload = {
      isClanRoot: Boolean(data.isClanRoot),
      fatherId: data.isClanRoot
        ? data.fatherName?.trim() || null
        : (typeof data.fatherId === "object"
            ? data.fatherId?.value
            : data.fatherId) || null,

      motherId: data.isClanRoot
        ? data.motherName?.trim() || null
        : (typeof data.motherId === "object"
            ? data.motherId?.value
            : data.motherId) || null,

      spousesIds: formatIdList(data.spousesIds),
      childrensIds: formatIdList(data.childrensIds),

      wedding: {
        spouseId:
          typeof data.wedding?.spouseId === "object"
            ? data.wedding?.spouseId?.value
            : data.wedding?.spouseId || null,
        dateTime: data.wedding?.dateTime
          ? new Date(data.wedding.dateTime)
          : null,
        place: data.wedding?.place?.trim() || "",
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
          result.error || result.message || "পারিবারিক তথ্য আপডেট ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "পারিবারিক সম্পর্ক তথ্য সফলভাবে আপডেট করা হয়েছে!",
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
        <h4 className="text-dark font-weight-bold mb-1">পরিবার ও সম্পর্ক (Family & Relations)</h4>
        <p className="text-muted small mb-0">পিতা, মাতা, স্বামী/স্ত্রী, সন্তান ও বিবাহের বিবরণ</p>
      </div>

      {/* Clan Root Option */}
      <div className="col-12 mb-2">
        <div className="form-check">
          <input
            type="checkbox"
            id="isClanRootFamily"
            {...register("isClanRoot")}
            className="form-check-input"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label
            htmlFor="isClanRootFamily"
            className="form-check-label ms-2 font-weight-bold"
            style={{ cursor: "pointer" }}
          >
            বংশের আদি পুরুষ অথবা বংশের বাইরের সদস্য (Clan Root)
          </label>
        </div>
      </div>

      {/* Father */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>পিতা</label>
          {isClanRoot ? (
            <input
              {...register("fatherName")}
              className="form-control"
              placeholder="পিতার নাম লিখুন"
            />
          ) : (
            <Controller
              name="fatherId"
              control={control}
              render={({ field }) => (
                <GlobalSelect
                  {...field}
                  options={fatherOptions}
                  value={
                    fatherOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  onChange={(val) => {
                    field.onChange(val ? val.value : null);
                    setValue("motherId", null);
                  }}
                  placeholder="পিতা নির্বাচন করুন"
                  isClearable
                />
              )}
            />
          )}
        </div>
      </div>

      {/* Mother */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>মাতা</label>
          {isClanRoot ? (
            <input
              {...register("motherName")}
              className="form-control"
              placeholder="মাতার নাম লিখুন"
            />
          ) : (
            <Controller
              name="motherId"
              control={control}
              render={({ field }) => (
                <GlobalSelect
                  {...field}
                  options={motherOptions}
                  value={
                    motherOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  onChange={(val) => field.onChange(val ? val.value : null)}
                  placeholder="মাতা নির্বাচন করুন"
                  isClearable
                />
              )}
            />
          )}
        </div>
      </div>

      {/* Spouses */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>স্বামী / স্ত্রী (Spouse)</label>
          <Controller
            name="spousesIds"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                isMulti
                options={memberSelectOptions}
                value={memberSelectOptions.filter((opt) =>
                  (field.value || []).includes(opt.value),
                )}
                onChange={(selected) =>
                  field.onChange(selected ? selected.map((s) => s.value) : [])
                }
                placeholder="স্বামী / স্ত্রী নির্বাচন করুন"
              />
            )}
          />
        </div>
      </div>

      {/* Children */}
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <label>সন্তান-সন্ততি (Children)</label>
          <Controller
            name="childrensIds"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                isMulti
                options={memberSelectOptions}
                value={memberSelectOptions.filter((opt) =>
                  (field.value || []).includes(opt.value),
                )}
                onChange={(selected) =>
                  field.onChange(selected ? selected.map((c) => c.value) : [])
                }
                placeholder="সন্তান নির্বাচন করুন"
              />
            )}
          />
        </div>
      </div>

      {/* Wedding Information */}
      <div className="col-12 mt-4 pt-2 border-top">
        <h5 className="text-dark font-weight-bold mb-1">
          বিবাহের বিবরণ (Wedding Details)
        </h5>
        <p className="text-muted small mb-3">
          বিবাহের তারিখ, স্থান ও সংশ্লিষ্ট জীবনসঙ্গী
        </p>
      </div>

      <div className="col-lg-4 col-12">
        <div className="form-group">
          <label>সংশ্লিষ্ট জীবনসঙ্গী (Spouse)</label>
          <Controller
            name="wedding.spouseId"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={memberSelectOptions}
                value={
                  memberSelectOptions.find(
                    (opt) => opt.value === (field.value?.value || field.value),
                  ) || null
                }
                onChange={(selected) =>
                  field.onChange(selected ? selected.value : null)
                }
                placeholder="জীবনসঙ্গী নির্বাচন করুন"
                isClearable
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-4 col-12">
        <div className="form-group">
          <label>বিবাহের তারিখ</label>
          <Controller
            name="wedding.dateTime"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="বিবাহের তারিখ"
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
          <label>বিবাহের স্থান</label>
          <input
            {...register("wedding.place")}
            className="form-control"
            placeholder="বিবাহের স্থান (গ্রাম/শহর)"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary px-5"
          disabled={submitting}
        >
          {submitting ? "সংরক্ষণ হচ্ছে..." : "পারিবারিক তথ্য আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}
