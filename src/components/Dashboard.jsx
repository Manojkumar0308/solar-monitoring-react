import React from 'react';
import Users from './Users';
import MobNavBar from './MobileNavBar';
import { motion } from 'framer-motion';

const Dashboard = ({ isSidebarOpen, toggleSidebar, setActiveTab }) => {
  // Animation settings for the grid items
  const gridItemVariants = {
    hidden: { opacity: 0, x: -100 }, // Start off-screen to the left
    visible: { opacity: 1, x: 0 }, // Final state
  };

  // Animation settings for the Users component
  const usersVariants = {
    hidden: { opacity: 0, y: 100 }, // Start off-screen to the left
    visible: { opacity: 1, y: 0 }, // Final state
  };

  const gridItems = [
    { title: 'Total Sites', value: '100+', change: '+60.5%', changeColor: 'text-green-500' },
    { title: 'Active Sites', value: '45', change: '+12.5%', changeColor: 'text-red-500' },
    { title: 'Inactive Sites', value: '10', change: '-4.5%', changeColor: 'text-green-500' },
    { title: 'Pageviews', value: '823,067', change: '+21.2%', changeColor: 'text-green-500' },
  ];

  return (
    <div className="max-w-full bg-gray-100 dark:bg-gray-900">
      {/* Use MobileNavbar component */}
      <MobNavBar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <div className="p-8 max-w-full bg-gray-100 overflow-hidden dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6">Welcome, Admin</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Animated Grid Items with staggered effect */}
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              variants={gridItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.3 }} // Stagger delay based on index
              whileInView="visible" // Animate when in view
              viewport={{ once: true }} // Only animate once when it comes into view
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
              <span className={item.changeColor}>{item.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated Users Component */}
        <motion.div
          className='max-w-full mt-8'
          variants={usersVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.8 }} // Optional delay for Users
          whileInView="visible" // Animate when in view
          viewport={{ once: true}} // Trigger animation when 20% is visible // Only animate once when it comes into view
        >
          <Users />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
