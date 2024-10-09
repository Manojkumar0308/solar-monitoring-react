import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCake, faChevronDown, faGear, faLock, faSolarPanel, faStar, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import PermissionsDropDown from './PermissionsDropdown';

const Sidebar = ({ setActiveTab, isSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false); // State to track which dropdown is open

  const dropdownRef = useRef(); // Reference for the dropdowns

  // Toggle dropdowns based on their name
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown); 
    console.log('openDropdown',openDropdown)
  };


  // Close dropdowns when clicking outside of them
  useEffect(() => {
   
    const handleClickOutside = (event) => {
      if(openDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
    }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Close dropdown when an option is selected
  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    setOpenDropdown(false); // Close all dropdowns after selecting an option
  };

  return (
    <div className={`flex flex-col sm:w-1/3 md:w-2/6 lg:w-1/4 xl:w-1/6 bg-gray-800 text-white ${isSidebarOpen ? 'block' : 'hidden'} sm:block overflow-y-auto hidden-scrollbar`}>
      <div className='px-4 mt-2 sm:mt-6 mx-4 flex flex-row gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faSolarPanel} />
        <button className="block py-2 px-1 w-full text-left text-sm font-semibold" onClick={toggleDropdown} >
          Takyon Networks
        </button>
        <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
      </div>
      <Dropdown isOpen={openDropdown} onOptionSelect={handleOptionSelect} ref={dropdownRef} />

      <div className='h-px mt-2 sm:mt-4 bg-gray-700 sm:mb-2'></div>
      <nav className="mt-5 px-4">
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('dashboard')}>
          <FontAwesomeIcon icon={faWindows} />
          <button onClick={() => setActiveTab('dashboard')} className="py-2 px-1 w-full text-left text-sm font-semibold">
            Dashboard
          </button>
        </div>
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('users')}>
          <FontAwesomeIcon icon={faUsers} />
          <button onClick={() => setActiveTab('users')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Users
          </button>
        </div>

        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('settings')}>
          <FontAwesomeIcon icon={faGear} />
          <button onClick={() => setActiveTab('settings')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Settings
          </button>
        </div>

        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => toggleDropdown('permissions')}>
          <FontAwesomeIcon icon={faLock} />
          <button onClick={() => toggleDropdown('permissions')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Permissions
          </button>
          <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
        </div>
        <PermissionsDropDown isOpen={openDropdown === 'permissions'} onOptionSelect={handleOptionSelect} ref={dropdownRef} />

        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('settings')}>
          <FontAwesomeIcon icon={faUser} />
          <button onClick={() => setActiveTab('settings')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Search User
          </button>
        </div>
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('settings')}>
          <FontAwesomeIcon icon={faTelegram} />
          <button onClick={() => setActiveTab('settings')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Sent Notification
          </button>
        </div>
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={() => setActiveTab('settings')}>
          <FontAwesomeIcon icon={faBell} />
          <button onClick={() => setActiveTab('settings')} className="py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
            Notifications
          </button>
        </div>
      </nav>
      <div className="mt-auto p-4 flex flex-col justify-end ">
        <a href="/support" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">
          <span className='mr-2'><FontAwesomeIcon icon={faCake}></FontAwesomeIcon></span>Support
        </a>
        <a href="/changelog" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">
          <span className='mr-2'><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></span>Changelog
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
