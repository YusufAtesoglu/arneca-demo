import React, { useState } from 'react';
import Size from '../components/Size';
import Brand from '../components/Brand';
import Activity from '../components/Activity';
import Color from '../components/Color';
import Gender from './Gender';
import "../pages/css/index.css"

const Sidebar = ({ handleChange ,handleActivityChange,handleBrandsChange,handleGendersChange,handleSizeChange,handleColorChange}) => {
  // const [selectedCategory, setSelectedCategory] = useState({
  //   men: false,
  //   women: false,
  //   kids: false,
  // });

  // const handleCategoryChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedCategory((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  //   handleChange(event);
  // };

  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="border-r border-[#592e0c]">
          <span className='text-[#fc8123] text-[30px] fomt-bold w-full flex px-14 items-center py-3'>Logo</span>
          
          <ul className="py-5 pr-2 flex flex-col text-white space-x-5 space-y-5 overflow-y-auto h-screen  ">
           
            <Gender handleChange={handleGendersChange}/>
            <Color handleChange={handleColorChange} />
            <Size handleChange={handleSizeChange} />
            <Brand handleChange={handleBrandsChange} />
            <Activity handleChange={handleActivityChange} />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
