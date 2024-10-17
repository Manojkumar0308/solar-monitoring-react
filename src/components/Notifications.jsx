
import React,{useState} from 'react';

import MobileNavbar from './MobileNavBar';
import Dropdown from './Dropdown';
const Sendnotification=({isSidebarOpen,toggleSidebar,setActiveTab,activeTab})=>{
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setShowDropdown((prevState) => !prevState);
      };
    return(
        <div className='max-w-full h-screen flex flex-col'>
            {/* Use MobileNavbar component */}
            <MobileNavbar 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar}
                setActiveTab={setActiveTab}
                activeTab={activeTab}            
            />

            {/*Main Section */}
            <div className='h-screen min-w-full bg-white py-8 px-4'>
            <h1 className='text-xl font-bold items-center'>Notifications</h1>
            <div className='h-px w-full bg-gray-300 mt-[18px]'></div>
            <p className='text-md font-semibold mt-[20px]'>Choose Category</p>
            <div onClick={toggleDropdown} className='w-full h-36 mt-4 bg-red-100'>
                <Dropdown isOpen={showDropdown} closeDropdown={() => setShowDropdown(false)} />
            </div>
            </div>
            
        </div>
    );
}

export default Sendnotification;