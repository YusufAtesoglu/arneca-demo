import React, { useState } from 'react';
import Input from './Input';

const Activity = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState({
    Running: false,
    Basketball: false,
    Tennis: false,
    Casual: false,
    Heel:false,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedActivities((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
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
              checked={selectedActivities.Running}
              value={"Running"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Basketball"
              name="Basketball"
              checked={selectedActivities.Basketball}
              value={"Basketball"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Tennis"
              name="Tennis"
              checked={selectedActivities.Tennis}
              value={"Tennis"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Casual"
              name="Casual"
              checked={selectedActivities.Casual}
              value={"Casual"}
            />
          </li>
          <li>
            <Input
              handleChange={handleCheckboxChange}
              title="Heel"
              name="Heel"
              checked={selectedActivities.Heel}
              value={"Heel"}
            />
          </li>
        </ul>
      )}
    </li>
  );
};

export default Activity;
