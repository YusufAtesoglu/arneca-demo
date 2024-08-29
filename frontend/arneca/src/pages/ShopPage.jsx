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
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [counterCart, setCounterCart] = useState(0);
  const [label, setLabel] = useState([]); // Label state'i liste olarak tanımlandı
  const [selectedLabels, setSelectedLabels] = useState(["Sneaker", "Red"]);

  const handleRemoveLabel = (removedLabel) => {
    // Checkboxın seçili durumunu kaldırmak için bu fonksiyonu kullanın
    const checkbox = document.querySelector(`input[value="${removedLabel.toLowerCase()}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }

    // Diğer state güncellemeleri burada yapılabilir
    setSelectedLabels(selectedLabels.filter(label => label !== removedLabel));
  };
  const handleAddToCart = () => {
    setCounterCart(counterCart + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredItems(data);
        } else {
          console.log("Failed to fetch products.");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // const handleChange = (event) => { 
  //   const value = event.target.value;
  //   setSelectedCategories((prevCategories) =>
  //     prevCategories.includes(value)
  //       ? prevCategories.filter((category) => category !== value)
  //       : [...prevCategories, value]
  //   );console.log(event.target.name)
  //   updateLabel(value, event.target.checked);
  // };

  const handleBrandsChange = (event) => {
    const value = event.target.value;
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(value)
        ? prevBrands.filter((brand) => brand !== value)
        : [...prevBrands, value]
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
    updateLabel(event.target.value, checked);
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
        // const categoryParams = selectedCategories
        //   .map((cat) => encodeURIComponent(cat))
        //   .join(",");
        const activityParams = selectedActivities
          .map((act) => encodeURIComponent(act))
          .join(",");
        const brandParams = selectedBrands
          .map((bra) => encodeURIComponent(bra))
          .join(",");
        const genderParams = selectedGenders
          .map((gen) => encodeURIComponent(gen))
          .join(",");
        const sizeParams = selectedSizes
          .map((siz) => encodeURIComponent(siz))
          .join(",");
        const colorParams = selectedColors
          .map((clr) => encodeURIComponent(clr))
          .join(",");
  
        const response = await fetch(
          // `http://localhost:5000/api/products?query=${queryParam}&category=${categoryParams}&activity=${activityParams}&brand=${brandParams}&gender=${genderParams}&sizes=${sizeParams}&colors=${colorParams}`
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
    // selectedCategories,
    selectedActivities,
    selectedBrands,
    selectedGenders,
    selectedSizes,
    selectedColors,
    apiUrl,
  ]);
  
  // Seçilen cinsiyeti al, başlangıçta boş olsun
  const selectedGender = selectedGenders.length > 0 ? selectedGenders[0] : "";

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1d1f21]">
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <Navbar
          query={query}
          handleInputChange={handleInputChange}
          counterCart={counterCart}
        />
        <div className="border-b border-[#592e0c] py-2">
          <p className="text-[#815923] ml-10 pt-2">
            Home &gt; Shoes &gt;{selectedGender && ` ${selectedGender}`}
          </p>
        </div>
       <div className="shoes ml-10 pt-10 text-white"> <h1>Shoes</h1></div> 
      </div>
     
      <div className="flex w-full">
        <Sidebar
          // handleChange={handleChange}
          handleActivityChange={handleActivityChange}
          handleBrandsChange={handleBrandsChange}
          handleGendersChange={handleGendersChange}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          className={`transition-transform duration-300`} 
        />
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <Product
            label={label.join(', ')} // Label'ı virgülle ayrılmış bir string olarak ilet
            result={filteredItems.map(({ _id, img, name, price, colors }) => (
              <Card
                key={_id}
                img={img}
                name={name}
                price={price}
                colors={colors}
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
