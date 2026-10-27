"use client";

import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import GlobalSelect, {
  GlobalCreatableSelect,
} from "@/components/shared/GlobalSelect";
import {
  getDivisionOptions,
  getDistrictOptions,
  getUpazilaOptions,
  getPostOfficeOptions,
} from "@/lib/bangladeshGeoData";

export default function EditContactForm({ member }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      contact: {
        mobileNo: member?.contact?.mobileNo || "",
        whatsapp: member?.contact?.whatsapp || "",
        email: member?.contact?.email || "",
        facebook: member?.contact?.facebook || "",
        twitter: member?.contact?.twitter || "",
        instagram: member?.contact?.instagram || "",
        linkedin: member?.contact?.linkedin || "",
        website: member?.contact?.website || "",
      },
      sameAsPresent: false,
      address: {
        present: {
          village: member?.address?.present?.village || "",
          postOffice: member?.address?.present?.postOffice || "",
          policeStation: member?.address?.present?.policeStation || "",
          district: member?.address?.present?.district || "",
          division: member?.address?.present?.division || "",
          postalCode: member?.address?.present?.postalCode || "",
          country: member?.address?.present?.country || "বাংলাদেশ",
        },
        permanent: {
          village: member?.address?.permanent?.village || "",
          postOffice: member?.address?.permanent?.postOffice || "",
          policeStation: member?.address?.permanent?.policeStation || "",
          district: member?.address?.permanent?.district || "",
          division: member?.address?.permanent?.division || "",
          postalCode: member?.address?.permanent?.postalCode || "",
          country: member?.address?.permanent?.country || "বাংলাদেশ",
        },
      },
    },
  });

  const sameAsPresent = watch("sameAsPresent");

  // Present Address watchers
  const presentDivision = watch("address.present.division");
  const presentDistrict = watch("address.present.district");
  const presentPoliceStation = watch("address.present.policeStation");

  // Permanent Address watchers
  const permanentDivision = watch("address.permanent.division");
  const permanentDistrict = watch("address.permanent.district");
  const permanentPoliceStation = watch("address.permanent.policeStation");

  // Address Options
  const divisionOptions = useMemo(() => getDivisionOptions(), []);

  const presentDistrictOptions = useMemo(
    () => getDistrictOptions(presentDivision),
    [presentDivision],
  );
  const presentUpazilaOptions = useMemo(
    () => getUpazilaOptions(presentDivision, presentDistrict),
    [presentDivision, presentDistrict],
  );
  const presentPostOptions = useMemo(
    () =>
      getPostOfficeOptions(
        presentDivision,
        presentDistrict,
        presentPoliceStation,
      ),
    [presentDivision, presentDistrict, presentPoliceStation],
  );

  const permanentDistrictOptions = useMemo(
    () => getDistrictOptions(permanentDivision),
    [permanentDivision],
  );
  const permanentUpazilaOptions = useMemo(
    () => getUpazilaOptions(permanentDivision, permanentDistrict),
    [permanentDivision, permanentDistrict],
  );
  const permanentPostOptions = useMemo(
    () =>
      getPostOfficeOptions(
        permanentDivision,
        permanentDistrict,
        permanentPoliceStation,
      ),
    [permanentDivision, permanentDistrict, permanentPoliceStation],
  );

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      contact: {
        mobileNo: data.contact?.mobileNo?.trim() || "",
        whatsapp: data.contact?.whatsapp?.trim() || "",
        email: data.contact?.email?.trim() || "",
        facebook: data.contact?.facebook?.trim() || "",
        twitter: data.contact?.twitter?.trim() || "",
        instagram: data.contact?.instagram?.trim() || "",
        linkedin: data.contact?.linkedin?.trim() || "",
        website: data.contact?.website?.trim() || "",
      },
      address: {
        present: {
          village: data.address?.present?.village?.trim() || "",
          postOffice: data.address?.present?.postOffice?.trim() || "",
          policeStation: data.address?.present?.policeStation?.trim() || "",
          district: data.address?.present?.district?.trim() || "",
          division: data.address?.present?.division?.trim() || "",
          postalCode: data.address?.present?.postalCode?.trim() || "",
          country: data.address?.present?.country?.trim() || "বাংলাদেশ",
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
            )?.trim() || "বাংলাদেশ",
        },
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
          result.error || result.message || "যোগাযোগ তথ্য আপডেট ব্যর্থ হয়েছে",
        );
      }

      setFeedback({
        type: "success",
        message: "যোগাযোগের তথ্য ও ঠিকানা সফলভাবে আপডেট করা হয়েছে!",
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

      {/* ================= CONTACT ================= */}
      <div className="col-12 border-bottom pb-2 mb-2">
        <h4 className="text-dark font-weight-bold mb-1">
          যোগাযোগের তথ্য (Contact Information)
        </h4>
        <p className="text-muted small mb-0">মোবাইল, হোয়াটসঅ্যাপ, ইমেইল ও সোশ্যাল মিডিয়া লিংক</p>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>মোবাইল নম্বর</label>
          <input
            {...register("contact.mobileNo")}
            className="form-control"
            placeholder="01XXXXXXXXX"
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>হোয়াটসঅ্যাপ নম্বর</label>
          <input
            {...register("contact.whatsapp")}
            className="form-control"
            placeholder="+8801XXXXXXXXX"
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>ইমেইল</label>
          <input
            type="email"
            {...register("contact.email")}
            className="form-control"
            placeholder="example@mail.com"
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>ওয়েবসাইট</label>
          <input
            {...register("contact.website")}
            className="form-control"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>ফেসবুক লিংক</label>
          <input
            {...register("contact.facebook")}
            className="form-control"
            placeholder="https://facebook.com/..."
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>টুইটার / X</label>
          <input
            {...register("contact.twitter")}
            className="form-control"
            placeholder="https://twitter.com/..."
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>ইনস্টাগ্রাম</label>
          <input
            {...register("contact.instagram")}
            className="form-control"
            placeholder="https://instagram.com/..."
          />
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12">
        <div className="form-group">
          <label>লিংকডইন</label>
          <input
            {...register("contact.linkedin")}
            className="form-control"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      {/* ================= PRESENT ADDRESS ================= */}
      <div className="col-12 border-bottom pb-2 mt-4 mb-2">
        <h4 className="text-dark font-weight-bold mb-1">
          বর্তমান ঠিকানা (Present Address)
        </h4>
        <p className="text-muted small mb-0">বিভাগ, জেলা, থানা ও ডাকঘরের বিবরণ</p>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="form-group">
          <label>বিভাগ</label>
          <Controller
            name="address.present.division"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={divisionOptions}
                value={
                  divisionOptions.find((opt) => opt.value === field.value) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                placeholder="বিভাগ নির্বাচন করুন"
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue("address.present.district", "");
                  setValue("address.present.policeStation", "");
                  setValue("address.present.postOffice", "");
                  setValue("address.present.postalCode", "");
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="form-group">
          <label>জেলা</label>
          <Controller
            name="address.present.district"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={presentDistrictOptions}
                value={
                  presentDistrictOptions.find(
                    (opt) => opt.value === field.value,
                  ) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                placeholder={
                  presentDivision
                    ? "জেলা নির্বাচন করুন"
                    : "আগে বিভাগ নির্বাচন করুন"
                }
                isDisabled={!presentDivision}
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue("address.present.policeStation", "");
                  setValue("address.present.postOffice", "");
                  setValue("address.present.postalCode", "");
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="form-group">
          <label>থানা / উপজেলা</label>
          <Controller
            name="address.present.policeStation"
            control={control}
            render={({ field }) => (
              <GlobalSelect
                {...field}
                options={presentUpazilaOptions}
                value={
                  presentUpazilaOptions.find(
                    (opt) => opt.value === field.value,
                  ) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                placeholder={
                  presentDistrict
                    ? "থানা / উপজেলা নির্বাচন করুন"
                    : "আগে জেলা নির্বাচন করুন"
                }
                isDisabled={!presentDistrict}
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue("address.present.postOffice", "");
                  setValue("address.present.postalCode", "");
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="form-group">
          <label>ডাকঘর</label>
          <Controller
            name="address.present.postOffice"
            control={control}
            render={({ field }) => (
              <GlobalCreatableSelect
                {...field}
                options={presentPostOptions}
                value={
                  field.value
                    ? presentPostOptions.find(
                        (opt) => opt.value === field.value,
                      ) || { value: field.value, label: field.value }
                    : null
                }
                placeholder={
                  presentPoliceStation
                    ? "ডাকঘর নির্বাচন করুন বা লিখুন"
                    : "আগে থানা নির্বাচন করুন"
                }
                isDisabled={!presentPoliceStation}
                isClearable
                formatCreateLabel={(inputValue) => `"${inputValue}" যোগ করুন`}
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  if (val && val.postCode) {
                    setValue("address.present.postalCode", val.postCode);
                  }
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="form-group">
          <label>গ্রাম / রাস্তা / বাড়ি</label>
          <input
            {...register("address.present.village")}
            className="form-control"
            placeholder="গ্রাম বা রাস্তার নাম"
          />
        </div>
      </div>

      <div className="col-lg-2 col-md-6 col-12">
        <div className="form-group">
          <label>পোস্ট কোড</label>
          <input
            {...register("address.present.postalCode")}
            className="form-control"
            placeholder="পোস্ট কোড"
          />
        </div>
      </div>

      <div className="col-lg-2 col-md-6 col-12">
        <div className="form-group">
          <label>দেশ</label>
          <input
            {...register("address.present.country")}
            className="form-control"
            defaultValue="বাংলাদেশ"
            disabled
          />
        </div>
      </div>

      {/* Same as present checkbox */}
      <div className="col-12 my-2">
        <div className="form-check">
          <input
            type="checkbox"
            id="sameAsPresentContact"
            {...register("sameAsPresent")}
            className="form-check-input"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label
            htmlFor="sameAsPresentContact"
            className="form-check-label ms-2 text-muted"
            style={{ cursor: "pointer" }}
          >
            বর্তমান ও স্থায়ী ঠিকানা একই (Same as Present Address)
          </label>
        </div>
      </div>

      {/* ================= PERMANENT ADDRESS ================= */}
      {!sameAsPresent && (
        <>
          <div className="col-12 border-bottom pb-2 mt-3 mb-2">
            <h4 className="text-dark font-weight-bold mb-1">
              স্থায়ী ঠিকানা (Permanent Address)
            </h4>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="form-group">
              <label>বিভাগ</label>
              <Controller
                name="address.permanent.division"
                control={control}
                render={({ field }) => (
                  <GlobalSelect
                    {...field}
                    options={divisionOptions}
                    value={
                      divisionOptions.find(
                        (opt) => opt.value === field.value,
                      ) ||
                      (field.value
                        ? { value: field.value, label: field.value }
                        : null)
                    }
                    placeholder="বিভাগ নির্বাচন করুন"
                    isClearable
                    onChange={(val) => {
                      field.onChange(val ? val.value : "");
                      setValue("address.permanent.district", "");
                      setValue("address.permanent.policeStation", "");
                      setValue("address.permanent.postOffice", "");
                      setValue("address.permanent.postalCode", "");
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="form-group">
              <label>জেলা</label>
              <Controller
                name="address.permanent.district"
                control={control}
                render={({ field }) => (
                  <GlobalSelect
                    {...field}
                    options={permanentDistrictOptions}
                    value={
                      permanentDistrictOptions.find(
                        (opt) => opt.value === field.value,
                      ) ||
                      (field.value
                        ? { value: field.value, label: field.value }
                        : null)
                    }
                    placeholder={
                      permanentDivision
                        ? "জেলা নির্বাচন করুন"
                        : "আগে বিভাগ নির্বাচন করুন"
                    }
                    isDisabled={!permanentDivision}
                    isClearable
                    onChange={(val) => {
                      field.onChange(val ? val.value : "");
                      setValue("address.permanent.policeStation", "");
                      setValue("address.permanent.postOffice", "");
                      setValue("address.permanent.postalCode", "");
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="form-group">
              <label>থানা / উপজেলা</label>
              <Controller
                name="address.permanent.policeStation"
                control={control}
                render={({ field }) => (
                  <GlobalSelect
                    {...field}
                    options={permanentUpazilaOptions}
                    value={
                      permanentUpazilaOptions.find(
                        (opt) => opt.value === field.value,
                      ) ||
                      (field.value
                        ? { value: field.value, label: field.value }
                        : null)
                    }
                    placeholder={
                      permanentDistrict
                        ? "থানা / উপজেলা নির্বাচন করুন"
                        : "আগে জেলা নির্বাচন করুন"
                    }
                    isDisabled={!permanentDistrict}
                    isClearable
                    onChange={(val) => {
                      field.onChange(val ? val.value : "");
                      setValue("address.permanent.postOffice", "");
                      setValue("address.permanent.postalCode", "");
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="form-group">
              <label>ডাকঘর</label>
              <Controller
                name="address.permanent.postOffice"
                control={control}
                render={({ field }) => (
                  <GlobalCreatableSelect
                    {...field}
                    options={permanentPostOptions}
                    value={
                      field.value
                        ? permanentPostOptions.find(
                            (opt) => opt.value === field.value,
                          ) || { value: field.value, label: field.value }
                        : null
                    }
                    placeholder={
                      permanentPoliceStation
                        ? "ডাকঘর নির্বাচন করুন বা লিখুন"
                        : "আগে থানা নির্বাচন করুন"
                    }
                    isDisabled={!permanentPoliceStation}
                    isClearable
                    formatCreateLabel={(inputValue) => `"${inputValue}" যোগ করুন`}
                    onChange={(val) => {
                      field.onChange(val ? val.value : "");
                      if (val && val.postCode) {
                        setValue("address.permanent.postalCode", val.postCode);
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="form-group">
              <label>গ্রাম / রাস্তা / বাড়ি</label>
              <input
                {...register("address.permanent.village")}
                className="form-control"
                placeholder="গ্রাম বা রাস্তার নাম"
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12">
            <div className="form-group">
              <label>পোস্ট কোড</label>
              <input
                {...register("address.permanent.postalCode")}
                className="form-control"
                placeholder="পোস্ট কোড"
              />
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12">
            <div className="form-group">
              <label>দেশ</label>
              <input
                {...register("address.permanent.country")}
                className="form-control"
                defaultValue="বাংলাদেশ"
                disabled
              />
            </div>
          </div>
        </>
      )}

      {/* Submit */}
      <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary px-5"
          disabled={submitting}
        >
          {submitting ? "সংরক্ষণ হচ্ছে..." : "যোগাযোগ ও ঠিকানা আপডেট করুন"}
        </button>
      </div>
    </form>
  );
}
