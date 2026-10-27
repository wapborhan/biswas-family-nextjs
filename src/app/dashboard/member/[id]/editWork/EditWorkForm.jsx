"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function EditWorkForm({ member }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      occupations: member?.occupations?.length
        ? member.occupations
        : [
            {
              title: "",
              organization: "",
              location: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupations",
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      occupations: (data.occupations || [])
        .filter((item) => item.title?.trim() || item.organization?.trim())
        .map((item) => ({
          title: item.title?.trim() || "",
          organization: item.organization?.trim() || "",
          location: item.location?.trim() || "",
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
          result.error || result.message || "পেশা তথ্য আপডেট ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "কাজের বিবরণ ও পেশা সফলভাবে আপডেট করা হয়েছে!",
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
            কাজের বিবরণ ও পেশা (Occupations & Work)
          </h4>
          <p className="text-muted small mb-0">পদবী, প্রতিষ্ঠান ও কর্মস্থলের বিবরণ</p>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            append({
              title: "",
              organization: "",
              location: "",
            })
          }
        >
          + নতুন পেশা যোগ করুন
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="col-12 p-3 bg-light rounded border mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge badge-secondary">পেশা #{index + 1}</span>
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
              <label>পদবী (Designation / Title)</label>
              <input
                {...register(`occupations.${index}.title`)}
                className="form-control"
                placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার"
              />
            </div>
            <div className="col-lg-4 col-12">
              <label>প্রতিষ্ঠান (Organization)</label>
              <input
                {...register(`occupations.${index}.organization`)}
                className="form-control"
                placeholder="প্রতিষ্ঠানের নাম"
              />
            </div>
            <div className="col-lg-4 col-12">
              <label>কর্মস্থল (Location)</label>
              <input
                {...register(`occupations.${index}.location`)}
                className="form-control"
                placeholder="কর্মস্থল / শহর"
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
          {submitting ? "সংরক্ষণ হচ্ছে..." : "পেশা তথ্য আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}
