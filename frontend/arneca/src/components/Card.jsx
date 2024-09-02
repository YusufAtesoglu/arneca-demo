import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import "../pages/css/Card.css";

const Card = ({ img, name, price, colors, sizes, setcounterCart }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImage, setSelectedImage] = useState(img[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleColorClick = (color, index) => {
    setSelectedColor(color);
    setSelectedImage(img[index]);
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4 !rounded-3xl">
      <div className="card flex flex-col justify-between !rounded-3xl !border-none bg-[#424242] relative shadow-none">
        <div className="card-img-container h-full bg-[#424242] p-5 relative rounded-t-3xl">
          <img 
            src={selectedImage} 
            alt={name} 
            className="card-img-top custom-card-img rounded-t-3xl w-full h-52 object-cover" 
          />
          {isFavorite ? (
            <SolidHeartIcon
              className="absolute top-1 right-1 w-6 h-6 text-[#fc8123] cursor-pointer"
              onClick={handleFavoriteClick}
            />
          ) : (
            <OutlineHeartIcon
              className="absolute top-1 right-1 w-6 h-6 text-[#fc8123] cursor-pointer"
              onClick={handleFavoriteClick}
            />
          )}
        </div>
        <div className="flex flex-col px-4 py-2 bg-[#424242] rounded-b-3xl">
          <h5 className="card-title text-white text-lg font-semibold">{name}</h5>
          <div className="price text-[#808182]">
            <span className="font-bold">Sizes: {sizes[0]} - {sizes[sizes.length - 1]}</span>
          </div>
          <div className="w-full mt-2">
            <button
              onClick={setcounterCart}
              className="w-full px-4 py-2 bg-[#fc8123] text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <i className="bi bi-bag-fill"></i> Add to Bag
            </button>
          </div>
          <div className="flex mt-4 justify-between items-center text-[#fc8123]">
            <span className="font-bold text-lg">${price}</span>
            <div className="flex justify-end gap-1">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-btn ${color} w-6 h-6 rounded-full relative`}
                  onClick={() => handleColorClick(color, index)} 
                >
                  {selectedColor === color && (
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#fc8123] rotate-180"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
