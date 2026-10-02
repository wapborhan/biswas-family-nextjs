"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useEffect, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";

const genderOptions = [
  { value: "male", label: "পুরুষ" },
  { value: "female", label: "মহিলা" },
  { value: "other", label: "অন্যান্য" },
];

const EditInfo = ({ memberData, members }) => {
  const { register, control, handleSubmit, reset, watch, setValue } = useForm();

  /* ---------------- MEMBER OPTIONS ---------------- */
  const memberOptions = useMemo(
    () =>
      members.map((m) => ({
        value: m._id,
        label: m.name,
      })),
    [members],
  );

  /* ---------------- WATCH FATHER ---------------- */
  const father = watch("fatherId");

  /* ---------------- MOTHER OPTIONS ---------------- */
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

  /* ---------------- FIELD ARRAYS ---------------- */
  const { fields: occupations } = useFieldArray({
    control,
    name: "occupation",
  });

  const { fields: rewards } = useFieldArray({
    control,
    name: "rewards",
  });

  /* ---------------- SET DEFAULT VALUES ---------------- */
  useEffect(() => {
    if (!memberData) return;

    reset({
      name: memberData.name,
      gender: genderOptions.find((g) => g.value === memberData.gender),

      fatherId: memberData.fatherId
        ? {
            value: memberData.fatherId._id,
            label: memberData.fatherId.name,
          }
        : null,

      motherId: memberData.motherId
        ? {
            value: memberData.motherId._id,
            label: memberData.motherId.name,
          }
        : null,

      spousesIds: memberData.spousesIds?.map((s) => ({
        value: s._id,
        label: s.name,
      })),

      childrensId: memberData.childrensId?.map((c) => ({
        value: c._id,
        label: c.name,
      })),

      birth: memberData.birth,
      weeding: memberData.weeding,
      death: memberData.death,

      bloodGroup: memberData.bloodGroup,

      address: memberData.address,
      education: memberData.education,

      occupation: memberData.occupation?.length ? memberData.occupation : [{}],

      rewards: memberData.rewards?.length ? memberData.rewards : [{}],

      contact: memberData.contact,

      isClanRoot: memberData.isClanRoot,
      isApproved: memberData.isApproved,
    });
  }, [memberData, reset]);

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = (data) => {
    const payload = {
      ...data,
      gender: data.gender.value,
      fatherId: data.fatherId?.value || null,
      motherId: data.motherId?.value || null,
      spousesIds: data.spousesIds?.map((s) => s.value),
      childrensId: data.childrensId?.map((c) => c.value),
    };

    console.log("UPDATE PAYLOAD 👉", payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <h3>Edit Member</h3>

      <input {...register("name")} className="form-control mb-2" />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => <Select {...field} options={genderOptions} />}
      />

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

      <Controller
        name="spousesIds"
        control={control}
        render={({ field }) => (
          <Select {...field} options={memberOptions} isMulti />
        )}
      />

      <Controller
        name="childrensId"
        control={control}
        render={({ field }) => (
          <Select {...field} options={memberOptions} isMulti />
        )}
      />

      <button className="rn-btn mt-4 w-100">Update Member</button>
    </form>
  );
};

export default EditInfo;
