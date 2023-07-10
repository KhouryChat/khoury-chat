import React from "react";
import CustomInput from "../Input/Input";

const FormInput = ({ errorHighlight, type, name, onChange, placeholder }) => {
  return errorHighlight ? (
    <CustomInput
      classes="text-white p-3 bg-red-600 focus:outline-none rounded-md shadow-sm w-[500px] font-sans "
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  ) : (
    <CustomInput
      classes="text-white p-3 bg-slate-800 focus:outline-none rounded-md shadow-sm w-[500px] font-sans"
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
