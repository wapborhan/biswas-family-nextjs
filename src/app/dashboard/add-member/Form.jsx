"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InfoFields from "./InfoFields";
import BirthInfoFields from "./BirthInfoFields";
import AddressFields from "./AddressFields";

const Form = ({ malemembers = [] }) => {
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
  } = useForm({
    defaultValues: {
      isClanRoot: false,
      sameAsPresent: false,
      address: {
        present: { country: "বাংলাদেশ" },
        permanent: { country: "বাংলাদেশ" },
      },
    },
  });

  const sameAsPresent = watch("sameAsPresent");

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
          village: data.address?.present?.village?.trim() || "",
          postOffice: data.address?.present?.postOffice?.trim() || "",
          policeStation: data.address?.present?.policeStation?.trim() || "",
          district: data.address?.present?.district?.trim() || "",
          division: data.address?.present?.division?.trim() || "",
          postalCode: data.address?.present?.postalCode?.trim() || "",
          country: data.address?.present?.country?.trim() || "Bangladesh",
        },
        permanent: {
          village:
            (data.sameAsPresent
              ? data.address?.present?.village
              : data.address?.permanent?.village
            )?.trim() || "",
          postOffice:
            (data.sameAsPresent
              ? data.address?.present?.postOffice
              : data.address?.permanent?.postOffice
            )?.trim() || "",
          policeStation:
            (data.sameAsPresent
              ? data.address?.present?.policeStation
              : data.address?.permanent?.policeStation
            )?.trim() || "",
          district:
            (data.sameAsPresent
              ? data.address?.present?.district
              : data.address?.permanent?.district
            )?.trim() || "",
          division:
            (data.sameAsPresent
              ? data.address?.present?.division
              : data.address?.permanent?.division
            )?.trim() || "",
          postalCode:
            (data.sameAsPresent
              ? data.address?.present?.postalCode
              : data.address?.permanent?.postalCode
            )?.trim() || "",
          country:
            (data.sameAsPresent
              ? data.address?.present?.country
              : data.address?.permanent?.country
            )?.trim() || "Bangladesh",
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
      reset({
        name: "",
        birthPlace: "",
        fatherName: "",
        motherName: "",
        sameAsPresent: false,
        isClanRoot: false,
        address: {
          present: {
            division: "",
            district: "",
            policeStation: "",
            postOffice: "",
            village: "",
            postalCode: "",
            country: "Bangladesh",
          },
          permanent: {
            division: "",
            district: "",
            policeStation: "",
            postOffice: "",
            village: "",
            postalCode: "",
            country: "Bangladesh",
          },
        },
      });
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
      {/* CLAN ROOT, FATHER, MOTHER */}
      <InfoFields
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
        malemembers={malemembers}
        errors={errors}
      />

      {/* GENDER, BIRTH DATE, BIRTH TIME, BIRTH PLACE */}
      <BirthInfoFields control={control} register={register} errors={errors} />

      {/* PRESENT ADDRESS */}
      <AddressFields
        prefix="address.present"
        title="বর্তমান ঠিকানা (Present Address)"
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
      />

      {/* SAME AS PRESENT CHECKBOX */}
      <div className="col-12 my-3">
        <div className="form-group d-flex align-items-center">
          <input
            type="checkbox"
            id="sameAsPresent"
            {...register("sameAsPresent")}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          <label
            htmlFor="sameAsPresent"
            style={{
              cursor: "pointer",
              marginBottom: 0,
              color: "#878e99",
            }}
          >
            বর্তমান ও স্থায়ী ঠিকানা একই (Same as Present Address)
          </label>
        </div>
      </div>

      {/* PERMANENT ADDRESS */}
      {!sameAsPresent && (
        <AddressFields
          prefix="address.permanent"
          title="স্থায়ী ঠিকানা (Permanent Address)"
          control={control}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      )}

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

      {/* SUBMIT BUTTON */}
      <div className="col-12 mt-4">
        <button
          type="submit"
          className="rn-btn w-100"
          disabled={submitting}
          style={{
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? "not-allowed" : "pointer",
            zIndex: "0 !important",
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
