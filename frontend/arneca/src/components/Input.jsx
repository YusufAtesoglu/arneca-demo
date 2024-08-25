import React from 'react';
import "../pages/css/Input.css"
const Input = ({ handleChange, value, title, name, checked }) => {
  return (
    <label className="flex gap-4 items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        className="form-checkbox w-5 h-5 border-[#fc8123] "
        value={value}
      />
      {title}
    </label>
  );
};

export default Input;
