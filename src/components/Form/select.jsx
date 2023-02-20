import React from "react";
import Select from "react-select";
import styles from "@/styles/Form.module.css";

export default function CustomSelect(props) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "40px",
      border: state.isFocused ? "2px solid #06c" : "2px solid #ccc",
      borderRadius: "4px",
      boxShadow: "none",
      "&:hover": {
        border: "2px solid #06c",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 999,
    }),
  };
  return (
    <div className="form-group p-2">
      {props.label && <label className="p-2">{props.label}</label>}
      <Select
        options={props.options}
        onChange={(option) => props.onChange(option.value)}
        placeholder="Select an option"
        styles={customStyles}
      />
    </div>
  );
}
