import Input from "./Input";
import { useState } from "react";
const Gender = ({handleChange}) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [selectedGenders, setSelectedGenders] = useState({
      Man: false,
      Women: false,
      Kids: false,
    });
  
    // const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setSelectedGenders((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
      handleChange(event);  // Marka seçimi değiştiğinde handleChange fonksiyonunu çağır
    };
  
    return (
     <ul className="w-24 flex justify-start flex-col pt-12 !pl-5">
  <li className="flex items-center mb-2">
    <Input
      handleChange={handleCheckboxChange}
      title="Man"
      name="Man"
      checked={selectedGenders.Man}
      value="Man"
      className="mr-2 w-24"
    />
  
  </li>
  <li className="flex items-center mb-2">
    <Input
      handleChange={handleCheckboxChange}
      title="Women"
      name="Women"
      checked={selectedGenders.Women}
      value="Women"
      className="mr-2"
    />
   
  </li>
  <li className="flex items-center">
    <Input
      handleChange={handleCheckboxChange}
      title="Kids"
      name="Kids"
      checked={selectedGenders.Kids}
      value="Kids"
      className="mr-2"
    />
  
  </li>
</ul>

        
    );
}

export default Gender
