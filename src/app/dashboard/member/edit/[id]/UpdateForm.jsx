"use client";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
  { value: "other", label: "অন্যান্য" },
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

export default function UpdateForm({ user }) {
  const {
    register,
    handleSubmit,
    control,

    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      ...user,
      // birth: {
      //   ...user.birth,
      //   dateTime: user.birth?.dateTime ? new Date(user.birth.dateTime) : null,
      // },
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      // birth: {
      //   ...data.birth,
      //   dateTime: data.birth.dateTime?.toISOString(),
      // },
    };

    console.log("UPDATED USER:", payload);
    // 👉 call API here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row  border-start pr-5 p-5"
    >
      {/* ================= Name ================= */}
      <div className="col-lg-12">
        <div className="form-group">
          <label>সম্পূর্ণ নাম</label>
          <input
            {...register("fullName", { required: "নাম আবশ্যক" })}
            className="form-control"
          />
          {errors.fullName && (
            <small className="text-danger">{errors.fullName.message}</small>
          )}
        </div>
      </div>{" "}
      <div className="col-lg-4">
        <div className="form-group">
          <label>ডাক নাম</label>
          <input {...register("nickName")} className="form-control" />
          {errors.nickName && (
            <small className="text-danger">{errors.nickName.message}</small>
          )}
        </div>
      </div>
      {/* ================= Gender & Blood ================= */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>লিঙ্গ</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                placeholder="Select Gender"
                value={genderOptions.find((g) => g.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
              />
            )}
          />
          {errors.gender && (
            <small className="text-danger">{errors.gender.message}</small>
          )}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="form-group">
          <label>রক্তের গ্রুপ</label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={bloodGroupOptions}
                placeholder="Blood Group"
                value={bloodGroupOptions.find((b) => b.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
              />
            )}
          />
          {errors.bloodGroup && (
            <small className="text-danger">{errors.bloodGroup.message}</small>
          )}
        </div>
      </div>
      {/* ================= Birth ================= */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>জন্ম তারিখ ও সময়</label>
          <Controller
            name="birth.dateTime"
            control={control}
            render={({ field }) => {
              const excludeTimes = [
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ];

              return (
                <DatePicker
                  placeholderText="Birth Date & Time"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  excludeTimes={excludeTimes}
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy - hh:mm aa"
                  className="form-control"
                />
              );
            }}
          />
        </div>
      </div>
      <div className="col-lg-8">
        <div className="form-group">
          <label>জন্ম স্থান</label>
          <input
            {...register("birth.place")}
            placeholder="Birth Place"
            className="form-control"
          />
        </div>
      </div>
      {/* ================= Present Address ================= */}
      <div className="container">
        <h6 className="px-2 font-semibold text-black">বর্তমান ঠিকানা</h6>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label>গ্রাম</label>
              <input
                {...register("address.present.village")}
                placeholder="গ্রাম"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>পোস্ট অফিস</label>
              <input
                {...register("address.present.postOffice")}
                placeholder="পোস্ট অফিস"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>উপজেলা/থানা</label>
              <input
                {...register("address.present.thana")}
                placeholder="উপজেলা/থানা"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>জেলা</label>
              <input
                {...register("address.present.district")}
                placeholder="জেলা"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ================= permanent Address ================= */}
      <div className="container">
        <h6 className="px-2 font-semibold text-black">স্থায়ী ঠিকানা</h6>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label>গ্রাম</label>
              <input
                {...register("address.permanent.village")}
                placeholder="গ্রাম"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>পোস্ট অফিস</label>
              <input
                {...register("address.permanent.postOffice")}
                placeholder="পোস্ট অফিস"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>উপজেলা/থানা</label>
              <input
                {...register("address.permanent.thana")}
                placeholder="উপজেলা/থানা"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>জেলা</label>
              <input
                {...register("address.permanent.district")}
                placeholder="জেলা"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ================= Contact ================= */}
      <fieldset className="border p-4 rounded">
        <legend className="px-2 font-semibold">Contact</legend>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("contact.mobileNo")}
            placeholder="Mobile"
            className="form-control"
          />
          <input
            {...register("contact.whatsapp")}
            placeholder="WhatsApp"
            className="input"
          />
          <input
            {...register("contact.email")}
            placeholder="Email"
            className="input"
          />
          <input
            {...register("contact.linkedin")}
            placeholder="LinkedIn"
            className="input"
          />
        </div>
      </fieldset>
      {/* ================= Submit ================= */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
