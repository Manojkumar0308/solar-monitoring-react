import React, { useState, useEffect } from 'react';
import MobileNavbar from "./MobileNavBar";
import { initializeSocket, getSocket } from '../socket';
import axios from 'axios';
import { Store } from 'react-notifications-component';

const UserNotification = ({ setIsLoggedIn, setUser, user, isSidebarOpen, toggleSidebar, setActiveTab, activeTab }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from server
  const fetchNotifications = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const response = await axios.get(`http://localhost:3000/api/admin/get-notification/${storedUser.user._id}`);
        setNotifications(response.data.data);
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
    fetchNotifications();

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
  }, [setUser]);

  return (
    <div>
      <MobileNavbar
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        user={user}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="container  mt-6 p-4">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No notifications to show</div>
          ) : (
            <ul>
              {notifications.map((notification, index) => (
                <NotificationItem key={index} notification={notification} />
              ))}
            </ul>
          )}
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
    <li className="border-b border-gray-200 py-4">
      <div className="flex xs:flex-col lg:flex-row  items-start">
        <div className="flex flex-col items-start pr-4 w-[100%] lg:w-[80%] bg-slate-300">
          <h3 className="font-medium text-md">{notification.title || 'Notification'}</h3>
          
          <p className="text-gray-400 text-xs lg:text-sm ">
           {notification.message.length > 180 && !isExpanded ? `${notification.message.substring(0, 170)}...` : notification.message}
            
          </p>

          {/* Read More / Show Less Button */}
          {isMessageLong && (
            <button
              onClick={toggleReadMore}
              className="text-blue-500 text-xs mt-1"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Date and Time Section */}
      
      </div>
    </li>
  );
};

export default UserNotification;
