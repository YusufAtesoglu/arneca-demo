
import Size from '../components/Size';
import Brand from '../components/Brand';
import Activity from '../components/Activity';
import Color from '../components/Color';
import Gender from './Gender';
import "../pages/css/index.css"

const Sidebar = ({ handleActivityChange,handleBrandsChange,handleGendersChange,handleSizeChange,handleColorChange}) => {


  return (
    <div>
      
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
