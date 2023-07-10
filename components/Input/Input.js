import React from "react";

const CustomInput = ({ classes, onChange, type, name, placeholder }) => {
  return (
    <input
      className={classes}
      onChange={(e) => onChange(e.target.value)}
      required
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
