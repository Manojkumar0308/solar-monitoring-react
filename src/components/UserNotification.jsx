import React, { useState, useEffect } from 'react';
import MobileNavbar from "./MobileNavBar";
import { initializeSocket, getSocket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Store } from 'react-notifications-component';

const UserNotification = ({ setIsLoggedIn, setUser, user, isSidebarOpen, toggleSidebar, setActiveTab, activeTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from server
  const fetchNotifications = async (page = 1) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/admin/get-notification/${storedUser.user._id}`, {
          params: { page, limit: 10 }
        });

         // Ensure the response contains the expected structure
         if (response.data && response.data.data) {
          setNotifications(response.data.data);
         
          setTotalPages(response.data.totalPages); // Ensure this is correct
          setCurrentPage(response.data.page); // Set current page from response
        }
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.user);
    }

    // Fetch existing notifications on component mount
    fetchNotifications(currentPage);
    
    // Initialize socket
    if (!getSocket()) {
      initializeSocket();
    }
    const socket = getSocket();

    // Handle real-time notifications
    const handleNotification = (data) => {
      if (data.customer_id === storedUser?.user?._id) {
        console.log('Received notification:', data);
        setNotifications((prev) => [...prev, data]); // Add new notification to the top
        Store.addNotification({
          title: "New Notification",
          message: data.message,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: { duration: 5000, onScreen: true }
        });
      }
    };

    // Listen for notifications
    if (socket) {
      socket.on('admin-send-notification', handleNotification);
    }

    return () => {
      if (socket) {
        socket.off('admin-send-notification', handleNotification);
      }
    };
    
  }, [setUser,currentPage,totalPages]);
 

  const handleNextPage = () => {
    if (currentPage < totalPages) {
     
      setCurrentPage((prevPage) => parseInt(prevPage) + 1) // Update the currentPage state
     
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => parseInt(prevPage) - 1); // Update the currentPage state
    }
  };

  return (
    <div className='w-[100%]'>
      <MobileNavbar
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        user={user}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className=" mt-6">
        <div className='flex items-start justify-between px-4'>
        <h2 className="text-2xl font-semibold mb-4 ">Notifications</h2>
        <button className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-xs">Filter</button>
        </div>
        
        
        <div className="bg-white shadow-md  w-full">
  {notifications.length === 0 ? (
    <div className="text-center py-8 text-gray-500 w-full">No notifications to show</div>
  ) : (
    <ul className="w-full">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </ul>
  )}
</div>
{/* Pagination */}
 <div className="flex justify-center mt-4 gap-4 items-center">
 <span className='mr-2' onClick={handlePreviousPage} disabled={currentPage <= 1}><FontAwesomeIcon icon={faArrowLeft} className='text-xl text-gray-600'/></span>
          
          <span className="text-xs text-semibold">Page {currentPage} of {totalPages}</span>
          <span 
            onClick={handleNextPage} 
            disabled={currentPage >= totalPages} 
            
          >
            <FontAwesomeIcon icon={faArrowRight} className='text-xl text-gray-600'/>
          </span>
        </div>
      </div>
    </div>
  );
};

// Notification Item Component with Read More / Show Less
const NotificationItem = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const isMessageLong = notification.message.length > 100;

  return (
    <li className="border-b border-gray-200 py-4 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start w-full px-4">
        {/* Content Container */}
        <div className="flex flex-col justify-between items-start w-full lg:w-[85%]">
          <h3 className="font-medium text-md">{notification.title || 'Notification'}</h3>
          <p className="text-gray-600 text-xs lg:text-sm">
            {notification.message.length > 180 && !isExpanded
              ? `${notification.message.substring(0, 170)}...`
              : notification.message}
          </p>
          {/* Read More / Show Less Button */}
          {isMessageLong && (
            <button onClick={toggleReadMore} className="text-blue-500 text-xs mt-1">
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Date and Time */}
        <div className="mt-3 lg:mt-0 lg:w-[15%] text-right ">
          <p className="text-gray-400 text-xs">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </li>
  );
};


export default UserNotification;
