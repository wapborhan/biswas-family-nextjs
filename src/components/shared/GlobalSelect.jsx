"use client";

import React, { forwardRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export const globalSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "8px",
    minHeight: "48px",
    borderColor: state.isFocused ? "#ee0c5f" : "#dce1e8",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(238, 12, 95, 0.15)" : "none",
    "&:hover": {
      borderColor: "#ee0c5f",
    },
    backgroundColor: state.isDisabled ? "#f8f9fa" : "#ffffff",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease-in-out",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#212529",
    fontSize: "18px",
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "#878e99",
    fontSize: "18px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    borderRadius: "8px",
    zIndex: 9999,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  }),
  menuPortal: (baseStyles) => ({
    ...baseStyles,
    zIndex: 9999,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    // Change background color based on the option state
    backgroundColor: state.isSelected
      ? "#ee0c5fe4" // Color when item is explicitly selected
      : state.isFocused
        ? "#e2317267" // Color when hovering over an option
        : "#ffffff", // Default fallback background color

    // Change text color to ensure readability against new backgrounds
    color: state.isSelected ? "#ffffff" : "#333333",
    fontSize: "18px !important",
    cursor: "pointer",

    // Optional: Keep active press styles looking clean
    ":active": {
      ...baseStyles[":active"],
      backgroundColor: state.isSelected ? "#0056b3" : "#d0e1f9",
    },
  }),
};

const mergeStyles = (defaultStyles, customStyles = {}) => {
  if (!customStyles || Object.keys(customStyles).length === 0) {
    return defaultStyles;
  }
  const merged = { ...defaultStyles };
  Object.keys(customStyles).forEach((key) => {
    if (
      typeof customStyles[key] === "function" &&
      typeof defaultStyles[key] === "function"
    ) {
      merged[key] = (base, state) =>
        customStyles[key](defaultStyles[key](base, state), state);
    } else {
      merged[key] = customStyles[key];
    }
  });
  return merged;
};

export const GlobalSelect = forwardRef(
  ({ styles = {}, isCreatable = false, ...props }, ref) => {
    const combinedStyles = mergeStyles(globalSelectStyles, styles);
    const Component = isCreatable ? CreatableSelect : Select;

    return <Component ref={ref} styles={combinedStyles} {...props} />;
  },
);

GlobalSelect.displayName = "GlobalSelect";

export const GlobalCreatableSelect = forwardRef(
  ({ styles = {}, ...props }, ref) => {
    return (
      <GlobalSelect ref={ref} isCreatable={true} styles={styles} {...props} />
    );
  },
);

GlobalCreatableSelect.displayName = "GlobalCreatableSelect";

// Compatibility aliases
export const GlobelSelect = GlobalSelect;
export default GlobalSelect;
