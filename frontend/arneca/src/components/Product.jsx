import React, { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Product = ({ result, label }) => {
  const [visibleLabels, setVisibleLabels] = useState([]);

  useEffect(() => {
    const filteredLabels = label.split(', ').filter(item => item.trim() !== '');
    setVisibleLabels(filteredLabels);
  }, [label]);

  const handleRemoveLabel = (indexToRemove) => {
    const updatedLabels = visibleLabels.filter((_, index) => index !== indexToRemove);
    setVisibleLabels(updatedLabels);
  };

  // Function to capitalize the first letter of each label
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="container pt-5">
      
      <div className="flex flex-wrap gap-2 mb-4">
        {visibleLabels.map((item, index) => (
          <div key={index} className="flex items-center bg-[#808182] p-2 rounded-3xl">
            <label className="mr-2 text-[#fff]">{capitalizeFirstLetter(item)}</label>
            <XCircleIcon
              className="w-10 h-7 text-[#fc8123]"
              onClick={() => handleRemoveLabel(index)}
            />
          </div>
        ))}
      </div>
      <div className="row">
        {result}
      </div>
    </div>
  );
};

export default Product;
