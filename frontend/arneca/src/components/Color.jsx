import React, { useState } from "react";
import Input from './Input';

const Color = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState({
    red: false,
    blue: false,
    green: false,
    yellow: false,
    white: false,
    black: false,
    grey:false,
   
  });

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColors((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    handleChange(event); // Notify the parent component of the change
  };

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full justify-between p-2 text-base transition duration-75 rounded-lg group text-[#fc8123]"
        onClick={handleToggle}
      >
        <span className="text-left rtl:text-right whitespace-nowrap text-[#fff]">
          Color
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="py-2 space-y-2 !pl-0">
          {Object.keys(selectedColors).map((color) => (
            <li key={color}>
              <Input
                handleChange={handleCheckboxChange}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
                name={color}
                checked={selectedColors[color]}
                value={color}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Color;
