import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faClose, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar'; // Assuming Sidebar component is imported from another file

// CSS classes for managing open/closed states of the sidebar, can be reused elsewhere
const sidebarOpenClass = "translate-x-0"; 
const sidebarClosedClass = "-translate-x-full";

const MobileNavbar = ({setActiveTab, activeTab}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
 
  };

  return (
    <div>
      {/* Mobile Navigation Bar */}
      <div className='py-4 bg-gray-900 flex justify-between items-center lg:hidden m-auto'>
        {/* Icon for opening the sidebar */}
        <FontAwesomeIcon 
          icon={faBarsStaggered} 
          className='ml-3 text-white text-2xl' 
          onClick={toggleSidebar} 
        />
        <div className='flex gap-1 items-center justify-center'>
          <FontAwesomeIcon icon={faRightFromBracket} className='m-auto text-white text-2xl'/>
          <span className='text-sm font-semibold m-auto text-white mr-3'>Logout</span>
        </div>
      </div>

      {/* Sidebar for mobile screens */}
      <div className={`w-2/3 sm:w-[30%] md:w-[30%]  fixed inset-0 z-50 transition-transform transform bg-gray-800 ${isSidebarOpen ? sidebarOpenClass : sidebarClosedClass} lg:hidden`}>
        {/* Close icon for the sidebar */}
        <div className='flex justify-end items-center px-4 py-2'>
          <FontAwesomeIcon icon={faClose} className='text-white text-2xl cursor-pointer' onClick={toggleSidebar} />
        </div>

        {/* Sidebar content: Here we reuse the Sidebar component */}
        <div className='overflow-y-auto h-full hide-scrollbar'>
          <Sidebar isSidebarOpen={isSidebarOpen} setActiveTab={setActiveTab} activeTab={activeTab}/>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
