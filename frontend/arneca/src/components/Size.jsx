import { useState } from 'react';
import Input from './Input';

const Size = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({
   
    37:false,
    38:false,
    39:false,
    40: false,
    41: false,
    42: false,
    43: false,
    44: false,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSizes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    handleChange(event);
  };

  return (
    <li>
      <button
        type="button"
        className="flex items-center justify-between w-full p-2 text-base transition duration-75 rounded-lg group text-[#fc8123] "
        onClick={toggleDropdown}
      >
        <span className="flex justify-between items-start whitespace-nowrap text-[#ffff]">Size</span>
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
          {Object.keys(selectedSizes).map((size) => (
            <li key={size}>
              <Input
                handleChange={handleCheckboxChange}
                title={size}
                name={size}
                checked={selectedSizes[size]}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Size;
