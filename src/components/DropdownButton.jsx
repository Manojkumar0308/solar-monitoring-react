import React, { useState } from 'react';
 // Dropdown component ko import kar rahe hain
import Dropdown from './Dropdown'; // Dropdown component ko import kar rahe hain
const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen)

  return (
    <div className="relative inline-block text-left">
      {/* Button Component */}
      <Button onClick={toggleDropdown} /> {/* Button ko click par toggleDropdown call karne ke liye */}

      {/* Dropdown - Dropdown ko isOpen prop ke saath pass kiya gaya hai */}
      <Dropdown isOpen={isOpen} />
    </div>
  );
};

export default DropdownButton;
