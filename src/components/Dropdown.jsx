import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import {  faUser, faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
const Dropdown = forwardRef(({ isOpen, onOptionSelect }, ref)=> {
    console.log('dropdown is open ?',isOpen)
    if(!isOpen){
      return null;
    }
  return (
   
      <div ref={ref} className="absolute left-8 w-64 z-20 right-0 mt-2  bg-gray-800 border border-gray-700 rounded-md shadow-lg">
        <ul className='m-4'>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Account')}><span className="mr-2"><FontAwesomeIcon icon={faUser} /></span>Account</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Settings')}><span className="mr-2"><FontAwesomeIcon icon={faGear} /></span>Settings</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Logout')}><span className="mr-2"><FontAwesomeIcon icon={faRightFromBracket} /></span>Logout</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
        </ul>
      </div>
    
  );
});

export default Dropdown;
