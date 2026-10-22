"use client";

import { useMemo, useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const InfoFields = ({
  control,
  register,
  watch,
  setValue,
  malemembers = [],
  errors,
}) => {
  const isClanRoot = watch("isClanRoot");
  const selectedFather = watch("father");

  // Reset fields on clan root change
  useEffect(() => {
    if (isClanRoot) {
      setValue("father", null);
      setValue("mother", null);
    } else {
      setValue("fatherName", "");
      setValue("motherName", "");
    }
  }, [isClanRoot, setValue]);

  // Father options from male members
  const fatherOptions = useMemo(
    () =>
      malemembers.map((member) => ({
        value: member._id,
        label: member.fullName,
      })),
    [malemembers],
  );

  // Mother options dependent on selected father
  const motherOptions = useMemo(() => {
    if (!selectedFather) return [];

    const father = malemembers.find((m) => m._id === selectedFather.value);
    if (!father?.spousesIds) return [];

    return father.spousesIds.map((wife) => ({
      value: wife._id,
      label: wife.fullName,
    }));
  }, [selectedFather, malemembers]);

  return (
    <>
      <div className="col-lg-12">
        <div className="form-group">
          <label htmlFor="name">নাম</label>
          <input
            {...register("name", { required: "নাম আবশ্যক" })}
            className="form-control"
            placeholder="সদস্যের পুরো নাম লিখুন"
            id="name"
            name="name"
            autoComplete="off"
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>
      </div>

      {/* Clan Root Checkbox */}
      <div className="col-lg-12">
        <div className="form-group d-flex align-items-center mb-3">
          <input
            type="checkbox"
            id="isClanRoot"
            name="isClanRoot"
            {...register("isClanRoot")}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          <label
            htmlFor="isClanRoot"
            style={{
              cursor: "pointer",
              marginBottom: 0,
              color: "#000",
            }}
          >
            বংশের আদি পুরুষ অথবা বংশের বাইরের সদস্য (Clan Root)
          </label>
        </div>
      </div>

      {/* Father */}
      <div className="col-lg-4">
        <div className="form-group">
          <label htmlFor="fathername">পিতা</label>
          {isClanRoot ? (
            <input
              type="text"
              {...register("fatherName")}
              className="form-control"
              placeholder="পিতার নাম লিখুন"
              id="fathername"
              name="fathername"
              autocomplete="off"
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
                    setValue("mother", null); // reset mother when father changes
                  }}
                />
              )}
            />
          )}
        </div>
      </div>

      {/* Mother */}
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
    </>
  );
};

export default InfoFields;
