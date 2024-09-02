import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar.jsx";
import Product from "../components/Product.jsx";
import Card from "../components/Card.jsx";
import "../pages/css/index.css";


const ShopPage = () => {
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [counterCart, setCounterCart] = useState(0);
  const [label, setLabel] = useState([]); // Label state'i liste olarak tanımlandı
 

 
  const handleAddToCart = () => {
    setCounterCart(counterCart + 1);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleBrandsChange = (event) => {
    const value = event.target.value;
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(value) //(Bu, value değerinin (yani checkbox'ın değeri) prevBrands dizisinde olup olmadığını kontrol eder.)
        ? prevBrands.filter((brand) => brand !== value) //dizi de mevcutsa, bu demektşr ki checkbıx işaretini kaldırmak isstiyor
        : [...prevBrands, value] //eğer value dizide mevcut değilse bu demektir ki checkbox yeni işaretlendi prevBrands a value eklenir
    );console.log(value);
    
    updateLabel(value, event.target.checked);
  };

  const handleSizeChange = (event) => {
    const value = event.target.name;
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
    updateLabel(value, event.target.checked);
  };

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColors((prevColors) => {
      const updatedColors = checked
        ? [...prevColors, name]
        : prevColors.filter((color) => color !== name);
      return updatedColors;
    });
    updateLabel(event.target.value, checked); //label yaz
  };
  

  const handleGendersChange = (event) => {
    const value = event.target.value;
    setSelectedGenders((prevGenders) =>
      prevGenders.includes(value)
        ? prevGenders.filter((gender) => gender !== value)
        : [...prevGenders, value]
    );console.log(value)
    updateLabel(value, event.target.checked);
  };

  const handleActivityChange = (event) => {
    const value = event.target.value;
    setSelectedActivities((prevActivities) =>
      prevActivities.includes(value)
        ? prevActivities.filter((activity) => activity !== value)
        : [...prevActivities, value]
    );
    updateLabel(value, event.target.checked);
  };

  // Label'ı güncellemek için fonksiyon
  const updateLabel = (value, checked) => {
    setLabel((prevLabel) => {
      if (checked) {
        return [...prevLabel, value];
      } else {
        return prevLabel.filter((item) => item !== value);
      }
    });
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const queryParam = encodeURIComponent(query);
   
        const activityParams = selectedActivities
          .map((act) => encodeURIComponent(act))
          .join(",");
        const brandParams = selectedBrands
          .map((bra) => encodeURIComponent(bra))
          .join(",");
        const genderParams = selectedGenders
          .map((gen) => encodeURIComponent(gen)) //Bu fonksiyon, özel karakterleri URL'de kullanılabilir hale getirir.
          .join(",");// Kodlanmış renkleri tek bir stringde virgülle ayırarak birleştirmek.
        const sizeParams = selectedSizes
          .map((siz) => encodeURIComponent(siz))
          .join(",");
        const colorParams = selectedColors
          .map((clr) => encodeURIComponent(clr))
          .join(",");
  
        const response = await fetch(
        
          `http://localhost:5000/api/products?query=${queryParam}&activity=${activityParams}&brand=${brandParams}&gender=${genderParams}&sizes=${sizeParams}&colors=${colorParams}`  );
  
        if (response.ok) {
          const data = await response.json();
          setFilteredItems(data);
        } else {
          console.log("Failed to fetch filtered data.");
        }
      } catch (error) {
        console.log("Filtering error:", error);
      }
    };
  
    fetchFilteredProducts();
  }, [
    query,
    selectedActivities,
    selectedBrands,
    selectedGenders,
    selectedSizes,
    selectedColors,
    apiUrl,
  ]);
 
  // Seçilen cinsiyetleri al
   const selectedGendersText = selectedGenders.length > 0 ? selectedGenders.join(', ') : "";
 
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1d1f21]">
      <div
        // className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        className={`transition-all duration-300 ml-64`}
      >
        <Navbar
          query={query}
          handleInputChange={handleInputChange}
          counterCart={counterCart}
        />
        <div className="border-b border-[#592e0c] py-2">
          <p className="text-[#815923] ml-10 pt-2">
          Home &gt; Shoes &gt; {selectedGendersText}
          </p>
        </div>
       <div className="shoes ml-44 pt-10 text-white"> <h1>Shoes</h1></div> 
      </div>
     
      <div className="flex w-full">
        <Sidebar
     
          handleActivityChange={handleActivityChange}
          handleBrandsChange={handleBrandsChange}
          handleGendersChange={handleGendersChange}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          className={`transition-transform duration-300`} 
        />
        <div
          // className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
          className={`flex-1 transition-all duration-300 ml-64`}
        >
          <Product
            label={label.join(', ')} // Label'ı virgülle ayrılmış bir string olarak ilet
            result={filteredItems.map(({ _id, img, name, price, colors,sizes }) => (
              <Card
                key={_id}
                img={img}
                name={name}
                price={price}
                colors={colors}
                sizes={sizes}
                setcounterCart={handleAddToCart}
              />
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
