import React,{useState, useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox, faTelegram, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown, faBell, faChevronDown, faGear, faLock, faSolarPanel, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton'; // Importing the DropdownButton
import Dropdown from './Dropdown';

const Sidebar = ({ setActiveTab ,isSidebarOpen,onClick}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const dropdownRef = useRef(null); // Reference for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle the dropdown state
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when an option is selected
  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`); // Log selected option
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className={`flex flex-col sm:w-1/6  bg-gray-800 text-white  ${isSidebarOpen ? 'block' : 'hidden'} sm:block  overflow-y-auto hidden-scrollbar`}>
     <div className='px-4 mt-2 sm:mt-6 mx-4  flex flex-row gap-1 items-center justify-center hover:bg-gray-700 rounded-md' onClick={toggleDropdown}> 
      <FontAwesomeIcon icon={faSolarPanel}/>
        <button  
        className="block py-2 px-1 w-full text-left text-sm font-semibold">
          Takyon Networks
        </button>
       
        <FontAwesomeIcon icon={faChevronDown} className='text-xs'/>
      </div>
      <Dropdown isOpen={isDropdownOpen} onOptionSelect={handleOptionSelect} ref={dropdownRef} /> {/* Pass the dropdown state */}
     
      <div className='h-px mt-2 sm:mt-4 bg-gray-700 sm:mb-2'></div>
      <nav className="mt-5 px-4">
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> 
        <FontAwesomeIcon icon={faWindows}/>
        <button 
       
        onClick={() => setActiveTab('dashboard')} className="block py-2 px-1 w-full text-left text-sm font-semibold">
          Dashboard
        </button>
      </div>
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faUsers}/>
      <button onClick={() => setActiveTab('users')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Users
        </button>
      </div>

      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faGear}/>
      <button onClick={() => setActiveTab('settings')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Settings
        </button>
      </div>     
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faLock}/>
      <button onClick={() => setActiveTab('settings')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Permissions
        </button>
        <FontAwesomeIcon icon={faChevronDown} className='text-xs'/>
      </div>     
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faUser}/>
      <button onClick={() => setActiveTab('settings')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Search User
        </button>
      </div> 
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faTelegram}/>
      <button onClick={() => setActiveTab('settings')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Sent Notification
        </button>
      </div> 
      <div className='px-4 flex gap-1 items-center justify-center hover:bg-gray-700 rounded-md'> <FontAwesomeIcon icon={faBell}/>
      <button onClick={() => setActiveTab('settings')} className="block py-2 px-1 hover:bg-gray-700 w-full text-left text-sm font-semibold">
          Notifications
        </button>
      </div>             
      </nav>
      <div className="mt-auto p-4 flex flex-col  justify-end ">
        <a href="/support" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">Support</a>
        <a href="/changelog" className="py-2 px-4 hover:bg-gray-700 rounded-md text-sm font-semibold">Changelog</a>
      </div>
    </div>
  );
};

export default Sidebar;
