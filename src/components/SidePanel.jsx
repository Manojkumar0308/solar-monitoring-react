import React from 'react';



const SidePanel = () => {

  return (
    <div className="hidden md:flex md:h-screen md:w-full bg-blue-600 text-white justify-center items-center relative">
      <div className="text-center z-10">
        <h3 className="text-3xl font-bold mb-4">Your Satisfaction is our Aim</h3>
        <p className="text-sm max-w-sm mx-auto">We’ve added the newest AI products and features to help with your tasks.</p>
      </div>
    </div>
  );
};

export default SidePanel;
