import React, { useState } from 'react';
import Input from './Input';

const Activity = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    handleChange(event);  // Activity seçimi değiştiğinde handleChange fonksiyonunu çağır
  };

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full justify-between p-2 text-base  transition duration-75 rounded-lg group text-[#fc8123] "
        onClick={toggleDropdown}
      >
        <span className=" text-left rtl:text-right whitespace-nowrap text-[#fff]">Activity</span>
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
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Running"
              name="Running"
            
              value={"Running"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Basketball"
              name="Basketball"
        
              value={"Basketball"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Tennis"
              name="Tennis"
            
              value={"Tennis"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Casual"
              name="Casual"
             
              value={"Casual"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Heel"
              name="Heel"
             
              value={"Heel"}
            />
          </li>
        </ul>
      )}
    </li>
  );
};

export default Activity;
