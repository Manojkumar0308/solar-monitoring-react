import React from 'react';
import { useAuth } from '../context/AuthContext/AuthContext';
import {useDropdown} from '../context/DropDownContext/DropdownContext';
import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useActiveTab} from '../context/ActiveTab/ActiveTab'
import {useDialog} from '../context/DialogContext/DialogContext';
import {  faTelegramPlane, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCake, faChevronDown, faGear,  faSolarPanel, faClose, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
const Sidebar = () => {
  const { user,logout } = useAuth();
  const {showDialog,hideDialog} = useDialog();
 const tokenExpiryTime = sessionStorage.getItem('tokenExpiry'); // Get stored token expiry time
 const currentTime = new Date().getTime();
 const isTokenExpired = tokenExpiryTime && currentTime > tokenExpiryTime;
  const { activeTab, setActiveTab } = useActiveTab(); // Access activeTab and setActiveTab from context
  const { isSidebarOpen,closeSidebar } = useSidebarToggle();
  const {toggleDropdown} = useDropdown();
  
  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    console.log("Toggle Dropdown Clicked");
    toggleDropdown();
};
  const handleTabClick = (tab) => {
    if(isTokenExpired){
      showDialog({
        type: 'message',
        title: 'Session Expired',
        message: 'Your session has expired. Please log in again.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      logout();
      
      closeSidebar();
    }
    setActiveTab(tab);
    closeSidebar();
   
  };
 
  const tabs =user && user.role === 'admin' ? ['dashboard', 'users', 'settings', 'profile','sendnotification'] : ['userDashboard', 'settings', 'profile', ,'notifications','support'];
  return (
    <div className="flex flex-col h-screen bg-gray-800">
     { isSidebarOpen && <div className='flex justify-end items-center px-4 py-2 bg-gray-800'>
          <FontAwesomeIcon icon={faClose} className='text-white text-2xl cursor-pointer' onClick={closeSidebar} />
        </div>}
    <div className={` lg:w-64  bg-gray-800 text-white ${isSidebarOpen ? 'block' : 'hidden'} lg:block overflow-y-auto hidden-scrollbar`}>
      <div className="px-4 mt-2 flex flex-row gap-1 items-center justify-center hover:bg-gray-700 rounded-md" onClick={handleDropdownClick}>
        <FontAwesomeIcon icon={faSolarPanel} />
        <button className="block py-2 px-1 w-full text-left text-sm font-semibold">Takyon Networks</button>
        <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
      </div>
      <Dropdown  />
      
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
  
      <div  className="mt-auto p-4">
        <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'>
          <div className='mt-2 mb-2 flex gap-1 items-center justify-center h-8 w-12 bg-red-300 rounded-lg'></div>
          <button className="py-2 px-1 w-full text-left text-sm font-semibold">Admin Bro</button>
        </div>
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
          case 'support':
          return faCake;
    default:
      return null;
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Sidebar;
