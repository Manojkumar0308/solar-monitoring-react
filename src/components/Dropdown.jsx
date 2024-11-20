import React, {  useRef,useEffect} from 'react';
import {useAuth} from '../context/AuthContext/AuthContext';
import { useActiveTab } from '../context/ActiveTab/ActiveTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import {  faUser, faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { disconnectSocket, initializeSocket } from '../socket'; // Import socket functions
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dropdown = ({isOpen ,closeDropdown})=> {
  const {isLoggedIn, logout,user,token } = useAuth();
  const { setActiveTab } = useActiveTab(); // Access setActiveTab from ActiveTabContext
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for the dropdown
  

  const handleClickOutside = (event) => {
    event.stopPropagation();
    
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      console.log('Inside Click');
    } else {
      console.log('Outside Click');
      closeDropdown(); // Close the dropdown if clicked outside
    }
  };

  //handle logout
  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent the default behavior
    // try {
    //   if (token) {
    //     console.log('token:', token);
    //     const response = await axios.post('http://localhost:3000/api/user/logout', {}, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log(response.data);
    //     // You can also call the disconnectSocket function here
        
    //     if (response.status === 200) {
    //       disconnectSocket();
    //       logout(); // AuthContext logout
    //       closeDropdown();      
    //       navigate('/', { replace: true });
    //     }
    //   } else {
    //     console.log('No token found',token);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
    logout(); // Call the logout function from context
    setActiveTab(''); // Reset active tab on logout
    closeDropdown(); // Close the dropdown if applicable
    navigate('/', { replace: true }); // Redirect to home or login page
  };

  useEffect(() => {
   
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
   
   // The dropdown will automatically open when the parent is clicked
  
 

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    closeDropdown(); // Close all dropdowns after selecting an option
  };

  if(!isOpen){
    return null;
  }
  return (
   
    <div ref={dropdownRef} className={`absolute left-8 w-64 z-20 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg transition-all duration-200 ease-in-out`}>
        <ul className='m-4'>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => handleOptionSelect('Account')}><span className="mr-2"><FontAwesomeIcon icon={faUser} /></span>Account</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => handleOptionSelect('Settings')}><span className="mr-2"><FontAwesomeIcon icon={faGear} /></span>Settings</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={handleLogout}><span className="mr-2"><FontAwesomeIcon icon={faRightFromBracket} /></span>Logout</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
        </ul>
      </div>
    
  );
}

export default React.memo(Dropdown);