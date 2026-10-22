"use client";

import { useMemo } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  getDivisionOptions,
  getDistrictOptions,
  getUpazilaOptions,
  getPostOfficeOptions,
} from "@/lib/bangladeshGeoData";

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const AddressFields = ({
  prefix,
  title,
  control,
  register,
  watch,
  setValue,
}) => {
  const selectedDivision = watch(`${prefix}.division`);
  const selectedDistrict = watch(`${prefix}.district`);
  const selectedUpazila = watch(`${prefix}.policeStation`);

  const divisionOptions = useMemo(() => getDivisionOptions(), []);

  const districtOptions = useMemo(
    () => getDistrictOptions(selectedDivision),
    [selectedDivision],
  );

  const upazilaOptions = useMemo(
    () => getUpazilaOptions(selectedDivision, selectedDistrict),
    [selectedDivision, selectedDistrict],
  );

  const postOfficeOptions = useMemo(
    () =>
      getPostOfficeOptions(selectedDivision, selectedDistrict, selectedUpazila),
    [selectedDivision, selectedDistrict, selectedUpazila],
  );

  return (
    <>
      {title && (
        <div className="col-12 mt-4 mb-2">
          <h5
            style={{
              color: "#3e3e3eff",
              borderBottom: "1px solid #333",
              paddingBottom: "8px",
            }}
          >
            {title}
          </h5>
        </div>
      )}

      {/* Division */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>বিভাগ (Division)</label>
          <Controller
            name={`${prefix}.division`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={
                  divisionOptions.find((opt) => opt.value === field.value) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                options={divisionOptions}
                placeholder="বিভাগ নির্বাচন করুন"
                styles={customStyles}
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue(`${prefix}.district`, "");
                  setValue(`${prefix}.policeStation`, "");
                  setValue(`${prefix}.postOffice`, "");
                  setValue(`${prefix}.postalCode`, "");
                }}
              />
            )}
          />
        </div>
      </div>

      {/* District */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>জেলা (District)</label>
          <Controller
            name={`${prefix}.district`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={
                  districtOptions.find((opt) => opt.value === field.value) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                options={districtOptions}
                placeholder={
                  selectedDivision
                    ? "জেলা নির্বাচন করুন"
                    : "আগে বিভাগ নির্বাচন করুন"
                }
                isDisabled={!selectedDivision}
                styles={customStyles}
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue(`${prefix}.policeStation`, "");
                  setValue(`${prefix}.postOffice`, "");
                  setValue(`${prefix}.postalCode`, "");
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Upazila / Thana */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>থানা / উপজেলা (Upazila / Thana)</label>
          <Controller
            name={`${prefix}.policeStation`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={
                  upazilaOptions.find((opt) => opt.value === field.value) ||
                  (field.value
                    ? { value: field.value, label: field.value }
                    : null)
                }
                options={upazilaOptions}
                styles={customStyles}
                placeholder={
                  selectedDistrict
                    ? "থানা / উপজেলা নির্বাচন করুন"
                    : "আগে জেলা নির্বাচন করুন"
                }
                isDisabled={!selectedDistrict}
                isClearable
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  setValue(`${prefix}.postOffice`, "");
                  setValue(`${prefix}.postalCode`, "");
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Post Office (Creatable Select) */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>ডাকঘর (Post Office)</label>
          <Controller
            name={`${prefix}.postOffice`}
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                value={
                  field.value
                    ? postOfficeOptions.find(
                        (opt) => opt.value === field.value,
                      ) || {
                        value: field.value,
                        label: field.value,
                      }
                    : null
                }
                options={postOfficeOptions}
                styles={customStyles}
                placeholder={
                  selectedUpazila
                    ? "ডাকঘর নির্বাচন করুন বা লিখুন"
                    : "আগে থানা / উপজেলা নির্বাচন করুন"
                }
                isDisabled={!selectedUpazila}
                isClearable
                formatCreateLabel={(inputValue) => `"${inputValue}" যোগ করুন`}
                onChange={(val) => {
                  field.onChange(val ? val.value : "");
                  if (val && val.postCode) {
                    setValue(`${prefix}.postalCode`, val.postCode);
                  } else if (!val) {
                    setValue(`${prefix}.postalCode`, "");
                  }
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Village / Street / House */}
      <div className="col-lg-4">
        <div className="form-group">
          <label>গ্রাম / রাস্তা / বাড়ি</label>
          <input
            {...register(`${prefix}.village`)}
            className="form-control"
            placeholder="গ্রাম বা রাস্তার নাম"
          />
        </div>
      </div>

      {/* Postal Code */}
      <div className="col-lg-2">
        <div className="form-group">
          <label>পোস্ট কোড</label>
          <input
            {...register(`${prefix}.postalCode`)}
            className="form-control"
            placeholder="পোস্ট কোড"
          />
        </div>
      </div>

      {/* Country */}
      <div className="col-lg-2">
        <div className="form-group">
          <label>দেশ (Country)</label>
          <input
            {...register(`${prefix}.country`)}
            className="form-control"
            defaultValue="বাংলাদেশ"
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default AddressFields;
