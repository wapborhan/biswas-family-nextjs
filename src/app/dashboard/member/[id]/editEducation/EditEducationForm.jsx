"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import GlobalSelect from "@/components/shared/GlobalSelect";

const educationLevelOptions = [
  { value: "primary", label: "প্রাথমিক (Primary)" },
  { value: "secondary", label: "মাধ্যমিক (Secondary)" },
  { value: "higher-secondary", label: "উচ্চ মাধ্যমিক (Higher Secondary)" },
  { value: "university", label: "বিশ্ববিদ্যালয় (University)" },
];

export default function EditEducationForm({ member }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      education: member?.education?.length
        ? member.education
        : [{ level: "secondary", institute: "", passingYear: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      education: (data.education || [])
        .filter((item) => item.institute?.trim() || item.passingYear?.trim())
        .map((item) => ({
          level:
            typeof item.level === "object" ? item.level?.value : item.level,
          institute: item.institute?.trim() || "",
          passingYear: item.passingYear?.trim() || "",
        })),
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
          result.error || result.message || "শিক্ষা তথ্য আপডেট ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "শিক্ষাগত যোগ্যতা সফলভাবে আপডেট করা হয়েছে!",
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

      <div className="col-12 d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
        <div>
          <h4 className="text-dark font-weight-bold mb-1">
            শিক্ষাগত যোগ্যতা (Education)
          </h4>
          <p className="text-muted small mb-0">
            প্রাথমিক, মাধ্যমিক, উচ্চ মাধ্যমিক ও বিশ্ববিদ্যালয় শিক্ষার বিবরণ
          </p>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            append({ level: "secondary", institute: "", passingYear: "" })
          }
        >
          + নতুন শিক্ষা যোগ করুন
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="col-12 p-3 bg-light rounded border mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge badge-secondary">শিক্ষা #{index + 1}</span>
            {fields.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger py-0 px-2"
                onClick={() => remove(index)}
              >
                মুছুন
              </button>
            )}
          </div>
          <div className="row g-2">
            <div className="col-lg-4 col-12">
              <label>স্তর (Level)</label>
              <Controller
                name={`education.${index}.level`}
                control={control}
                render={({ field: subField }) => (
                  <GlobalSelect
                    {...subField}
                    options={educationLevelOptions}
                    value={
                      educationLevelOptions.find(
                        (opt) => opt.value === subField.value,
                      ) || null
                    }
                    onChange={(val) =>
                      subField.onChange(val ? val.value : "secondary")
                    }
                    placeholder="স্তর নির্বাচন করুন"
                  />
                )}
              />
            </div>
            <div className="col-lg-5 col-12">
              <label>শিক্ষা প্রতিষ্ঠান (Institute)</label>
              <input
                {...register(`education.${index}.institute`)}
                className="form-control"
                placeholder="প্রতিষ্ঠানের নাম"
              />
            </div>
            <div className="col-lg-3 col-12">
              <label>পাসের সাল (Passing Year)</label>
              <input
                {...register(`education.${index}.passingYear`)}
                className="form-control"
                placeholder="যেমন: 2020"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary px-5"
          disabled={submitting}
        >
          {submitting ? "সংরক্ষণ হচ্ছে..." : "শিক্ষা তথ্য আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}
