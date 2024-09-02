import React, { useState } from "react";
import Input from './Input';

const Color = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
 

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    
    handleChange(event); 
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
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Red"
          name="red"
        
          value={"red"}
        />
      </li>
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Blue"
          name="blue"
    
          value={"blue"}
        />
      </li>
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Green"
          name="green"
        
          value={"green"}
        />
      </li>
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Yellow"
          name="yellow"
         
          value={"yellow"}
        />
      </li>
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="White"
          name="white"
         
          value={"white"}
        />
      </li>
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Black"
          name="black"
         
          value={"black"}
        />
      </li>
      
      <li>
        <Input
          handleChange={handleCheckboxChange}
          title="Grey"
          name="grey"
         
          value={"grey"}
        />
      </li>
    </ul>
      )}
    </li>
  );
};

export default Color;
