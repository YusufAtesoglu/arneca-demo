import { HeartIcon, ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import "../pages/css/Nav.css";

const Navbar = ({ handleInputChange, query, counterCart }) => {
  return (
    <nav className="flex items-center">
      <div className="relative flex items-center pl-14">
        <input
          className="search-input bg-[#2c2e30] text-white placeholder-gray-400 pl-5 py-2  focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-xxl"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search"
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fc8123] " />
      </div>
      <div className="profile-container flex flex-row-reverse gap-4 mr-20">
        <a href="#">
          <div className="relative inline-block">
            <HeartIcon className="w-6 h-6 text-[#fc8123]" />
          
          </div>
        </a>
        <a href="">
          <div className="relative inline-block">
            <ShoppingCartIcon className="w-6 h-6 text-[#fc8123]" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#fc8123] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{counterCart}</span>
          </div>
        </a>
        <a href="">
          <UserIcon className="w-6 h-6 text-[#fc8123]" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
