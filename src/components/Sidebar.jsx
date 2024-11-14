import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTelegram, faTelegramPlane, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCake, faChevronDown, faGear,  faSolarPanel, faStar, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';

const Sidebar = ({setIsLoggedIn, setActiveTab, isSidebarOpen,activeTab,setIsSidebarOpen,setUser,user}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setOpenDropdown((prevState) => !prevState);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
   
  };
  
  const tabs =user && user.role === 'admin' ? ['dashboard', 'users', 'settings', 'profile','sendnotification'] : ['userDashboard', 'settings', 'profile', 'sendnotification','notifications'];
  return (
    <div className={` lg:w-64  bg-gray-800 text-white ${isSidebarOpen ? 'block' : 'hidden'} lg:block overflow-y-auto hidden-scrollbar`}>
      <div className="px-4 mt-2 flex flex-row gap-1 items-center justify-center hover:bg-gray-700 rounded-md" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faSolarPanel} />
        <button className="block py-2 px-1 w-full text-left text-sm font-semibold">Takyon Networks</button>
        <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
      </div>
      <Dropdown setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} isOpen={openDropdown} closeDropdown={() => setOpenDropdown(false)} />
      
      <nav className="mt-5 px-4">
        {
       
        tabs.map((tab) => (
          <Link
            key={tab}
            to={`/${tab}`} // Use Link for navigation
            className={`px-4 mt-[6px] flex gap-1 items-center justify-center rounded-md ${tab === activeTab ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            onClick={() => handleTabClick(tab)}
          >
            <FontAwesomeIcon icon={getIcon(tab)} />
            <button className="py-2 px-1 w-full text-left text-sm font-semibold">{capitalizeFirstLetter(tab)}</button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 flex flex-col justify-end">
        <a href="/support" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">
          <span className='mr-2'><FontAwesomeIcon icon={faCake} /></span>Support
        </a>
        <a href="/changelog" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">
          <span className='mr-2'><FontAwesomeIcon icon={faStar} /></span>Changelog
        </a>
      </div>
      <div  className="mt-auto p-4">
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'>
          <div className='mt-2 mb-2 flex gap-1 items-center justify-center h-8 w-12 bg-red-300 rounded-lg'></div>
          <button className="py-2 px-1 w-full text-left text-sm font-semibold">Admin Bro</button>
        </div>
      </div>
    </div>
  );
};

const getIcon = (tab) => {
  switch (tab) {
    case 'dashboard':
      return faWindows;
    case 'users':
      return faUsers;
    case 'settings':
      return faGear;
    case 'profile':
      return faUser;
    case 'userDashboard':
      return faBell;
      case 'sendnotification':
        return faTelegramPlane;
        case 'notifications':
          return faBell;
    default:
      return null;
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Sidebar;
