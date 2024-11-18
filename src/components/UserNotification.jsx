import React, { useState, useEffect,useRef } from 'react';
import MobileNavbar from "./MobileNavBar";
import { initializeSocket, getSocket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const UserNotification = ({ setIsLoggedIn, setUser, user, isSidebarOpen, toggleSidebar, setActiveTab, activeTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 din pehle ki date
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const datePickerRef = useRef();
const itemsPerPage = 10;

  // Fetch notifications from server
  const fetchNotifications = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/admin/get-notification/${storedUser.user._id}`
        //   {
        //   params: { page, limit: 10 }
        // }
      );

         // Ensure the response contains the expected structure
         if (response.data && response.data.data) {
          setNotifications(response.data.data);
         
          // setTotalPages(response.data.totalPages); // Ensure this is correct
          // setCurrentPage(response.data.page); // Set current page from response
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
          message: data.title,
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
 

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFilterBtnClick = ()=>{
      setDateRange([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
      setCurrentPage(1);
    
    setShowDateRange(!showDateRange);
  }

  const handleDateChange = (ranges)=>{
    setDateRange([ranges.selection]);
  }

  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setShowDateRange(false); // Close the date range picker
      setDateRange([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]); // Reset the filter
    }
  };

  useEffect(() => {
    if (showDateRange) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDateRange]);

 // Apply date range filter
const filteredNotifications = notifications.filter((notification) => {
  const notificationDate = new Date(notification.created_at);

  const startDate = new Date(dateRange[0].startDate);
  startDate.setHours(0, 0, 0, 0); // Normalize to start of day

  const endDate = new Date(dateRange[0].endDate);
  endDate.setHours(23, 59, 59, 999); // Normalize to end of day

  const isWithinRange = notificationDate >= startDate && notificationDate <= endDate;
  // console.log('Is Within Range:', isWithinRange);
 
  return isWithinRange;
});
const sortedNotifications = filteredNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
const totalPages = Math.ceil(sortedNotifications.length / itemsPerPage);

// Get notifications for the current page
const paginatedNotifications = sortedNotifications.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

console.log('Total Pages:', totalPages);
console.log('Current Page:', currentPage);
console.log('Filtered Notifications:', filteredNotifications.length);
console.log('Paginated Notifications:', paginatedNotifications.length);

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
        <button className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-xs" onClick={handleFilterBtnClick}>Filter</button>
        </div>  
        {/* Selection of Date Range*/}
        {showDateRange && (
          <div className="mb-4">
            <div ref={datePickerRef}
            className="absolute z-10 right-0 bg-white shadow-lg p-4 rounded-md">
            <DateRangePicker
             editableDateInputs={true}
             ranges={dateRange}
              onChange={(handleDateChange)}
            />
            <div className='w-[20%] justify-end'></div>
             <button
              onClick={() => setShowDateRange(false)}
              className="bg-green-500 hover:bg-green-600 text-white mt-4 py-1 px-4 rounded-md text-xs"
            >
              Apply
            </button>
            </div>
          </div>
        )} 

        
{loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin border-t-4 border-blue-500 w-10 h-10 rounded-full"></div>
          </div>
        ) :(<div className="bg-white shadow-md  w-full">
  {paginatedNotifications.length === 0 ? (
    <div className="text-center py-8 text-gray-500 w-full">No notifications to show</div>
  ) : (
    <ul className="w-full">
      {paginatedNotifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </ul>
  )}
</div>)}
{/* Pagination */}
{loading?<div></div>:( <div className=" flex justify-center mt-4 gap-4 items-center">
 <span className='mr-2' onClick={handlePreviousPage} disabled={currentPage <= 1}><FontAwesomeIcon icon={faArrowLeft} className='text-xl text-gray-600'/></span>
          
          <span className="text-xs text-semibold">Page {currentPage} of {totalPages}</span>
          <span 
            onClick={handleNextPage} 
            disabled={currentPage >= totalPages} 
            
          >
            <FontAwesomeIcon icon={faArrowRight} className='text-xl text-gray-600'/>
          </span>
        </div>)}
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
