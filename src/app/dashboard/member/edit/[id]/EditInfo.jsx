"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMemo } from "react";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
  { value: "other", label: "অন্যান্য" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditInfo = ({ members = [], onSubmit }) => {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      occupation: [{}],
      rewards: [{}],
    },
  });

  /* ---------- MEMBER OPTIONS ---------- */
  const memberOptions = useMemo(
    () =>
      members.map((m) => ({
        value: m._id,
        label: m.name,
      })),
    [members],
  );

  /* ---------- FATHER WATCH ---------- */
  const father = watch("fatherId");

  /* ---------- MOTHER OPTIONS (BASED ON FATHER SPOUSES) ---------- */
  const motherOptions = useMemo(() => {
    if (!father) return [];
    const f = members.find((m) => m._id === father.value);
    return (
      f?.spousesIds?.map((w) => ({
        value: w._id,
        label: w.name,
      })) || []
    );
  }, [father, members]);

  /* ---------- FIELD ARRAYS ---------- */
  const {
    fields: occupations,
    append: addOcc,
    remove: remOcc,
  } = useFieldArray({ control, name: "occupation" });

  const {
    fields: rewards,
    append: addReward,
    remove: remReward,
  } = useFieldArray({ control, name: "rewards" });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="row rwt-dynamic-form p-5"
    >
      {/* ================= BASIC ================= */}
      <h4>ব্যক্তিগত তথ্য</h4>

      <div className="col-lg-6">
        <label>নাম *</label>
        <input
          {...register("name", { required: true })}
          className="form-control"
        />
      </div>

      <div className="col-lg-6">
        <label>লিঙ্গ *</label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Select {...field} options={genderOptions} />}
        />
      </div>

      {/* ================= RELATIONS ================= */}
      <h4 className="mt-5">সম্পর্ক</h4>

      <div className="col-lg-6">
        <label>পিতা</label>
        <Controller
          name="fatherId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={memberOptions}
              isClearable
              onChange={(v) => {
                field.onChange(v);
                setValue("motherId", null);
              }}
            />
          )}
        />
      </div>

      <div className="col-lg-6">
        <label>মাতা</label>
        <Controller
          name="motherId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={motherOptions}
              isDisabled={!father}
              isClearable
            />
          )}
        />
      </div>

      <div className="col-lg-6 mt-3">
        <label>স্বামী / স্ত্রী</label>
        <Controller
          name="spousesIds"
          control={control}
          render={({ field }) => (
            <Select {...field} options={memberOptions} isMulti />
          )}
        />
      </div>

      <div className="col-lg-6 mt-3">
        <label>সন্তান</label>
        <Controller
          name="childrensId"
          control={control}
          render={({ field }) => (
            <Select {...field} options={memberOptions} isMulti />
          )}
        />
      </div>

      {/* ================= BIRTH / WEDDING / DEATH ================= */}
      {["birth", "weeding", "death"].map((sec) => (
        <div key={sec} className="mt-5">
          <h4>{sec.toUpperCase()}</h4>
          <div className="row">
            <div className="col-lg-4">
              <Controller
                name={`${sec}.date`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="form-control"
                    placeholderText="তারিখ"
                  />
                )}
              />
            </div>
            <div className="col-lg-4">
              <input
                {...register(`${sec}.time`)}
                placeholder="সময়"
                className="form-control"
              />
            </div>
            <div className="col-lg-4">
              <input
                {...register(`${sec}.place`)}
                placeholder="স্থান"
                className="form-control"
              />
            </div>
          </div>
        </div>
      ))}

      {/* ================= BLOOD ================= */}
      <div className="col-lg-4 mt-5">
        <label>রক্তের গ্রুপ</label>
        <select {...register("bloodGroup")} className="form-control">
          <option value="">নির্বাচন করুন</option>
          {bloodGroups.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* ================= ADDRESS ================= */}
      <h4 className="mt-5">ঠিকানা</h4>

      <div className="col-lg-6">
        <input
          {...register("address.presentAddress")}
          placeholder="বর্তমান ঠিকানা"
          className="form-control"
        />
      </div>

      <div className="col-lg-6">
        <input
          {...register("address.permanentAddress")}
          placeholder="স্থায়ী ঠিকানা"
          className="form-control"
        />
      </div>

      {/* ================= EDUCATION ================= */}
      <h4 className="mt-5">শিক্ষা</h4>

      {[
        "primarySchool",
        "secondarySchool",
        "higherSecondarySchool",
        "university",
      ].map((f) => (
        <div key={f} className="col-lg-6">
          <input
            {...register(`education.${f}`)}
            placeholder={f}
            className="form-control mb-2"
          />
        </div>
      ))}

      {/* ================= OCCUPATION ================= */}
      <h4 className="mt-5">পেশা</h4>

      {occupations.map((f, i) => (
        <div key={f.id} className="border p-3 mt-2">
          <input
            {...register(`occupation.${i}.title`)}
            placeholder="Title"
            className="form-control mb-2"
          />
          <input
            {...register(`occupation.${i}.organization`)}
            placeholder="Organization"
            className="form-control mb-2"
          />
          <input
            {...register(`occupation.${i}.location`)}
            placeholder="Location"
            className="form-control mb-2"
          />
          <button type="button" onClick={() => remOcc(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addOcc({})}>
        + Add Occupation
      </button>

      {/* ================= REWARDS ================= */}
      <h4 className="mt-5">পুরস্কার</h4>

      {rewards.map((f, i) => (
        <div key={f.id} className="border p-3 mt-2">
          <input
            {...register(`rewards.${i}.title`)}
            placeholder="Title"
            className="form-control mb-2"
          />
          <input
            {...register(`rewards.${i}.year`)}
            placeholder="Year"
            className="form-control mb-2"
          />
          <textarea
            {...register(`rewards.${i}.description`)}
            placeholder="Description"
            className="form-control"
          />
          <button type="button" onClick={() => remReward(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addReward({})}>
        + Add Reward
      </button>

      {/* ================= CONTACT ================= */}
      <h4 className="mt-5">যোগাযোগ</h4>

      {[
        "mobileNo",
        "whatsapp",
        "email",
        "facebook",
        "twitter",
        "instagram",
        "linkedin",
        "website",
      ].map((f) => (
        <div key={f} className="col-lg-4">
          <input
            {...register(`contact.${f}`)}
            placeholder={f}
            className="form-control mb-2"
          />
        </div>
      ))}

      {/* ================= FLAGS ================= */}
      <div className="col-lg-6 mt-4">
        <label>
          <input type="checkbox" {...register("isClanRoot")} /> Clan Root
        </label>
      </div>

      <div className="col-lg-6 mt-4">
        <label>
          <input type="checkbox" {...register("isApproved")} /> Approved
        </label>
      </div>

      {/* ================= SUBMIT ================= */}
      <div className="col-12 mt-5">
        <button className="rn-btn w-100">Save Member</button>
      </div>
    </form>
  );
};

export default EditInfo;
