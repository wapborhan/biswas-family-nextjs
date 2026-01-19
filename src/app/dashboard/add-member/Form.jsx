"use client";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMemo } from "react";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
];

const Form = ({ malemembers }) => {
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

      {/* BUTTON */}
      <div className="col-12 mt-5">
        <button type="submit" className="rn-btn w-100">
          <span>সদস্য যুক্ত করুণ</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
