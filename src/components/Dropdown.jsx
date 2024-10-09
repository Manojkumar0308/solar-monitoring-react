import React, { forwardRef } from 'react';

const Dropdown = forwardRef(({ isOpen, onOptionSelect }, ref)=> {
    console.log(isOpen)
  return (
    isOpen && (
      <div ref={ref} className=" absolute left-4 w-64 z-10 right-0 mt-2  bg-gray-800 border border-gray-700 rounded-md shadow-lg">
        <ul className='m-4'>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Account')}>Account</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Settings')}>Settings</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Logout')}>Logout</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
        </ul>
      </div>
    )
  );
});

export default Dropdown;
