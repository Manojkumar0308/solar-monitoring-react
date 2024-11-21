import React, { useState, useEffect,useRef,useContext } from 'react';
import MobileNavbar from "./MobileNavBar";
import { initializeSocket, getSocket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'; // date-fns का उपयोग
import { useAuth } from '../context/AuthContext/AuthContext';

const UserNotification = () => {
  const { user, setUser, isLoggedIn ,token} = useAuth(); // Access user and setUser from AuthContext
  console.log('On user notification page token:', token);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isFilterApplied, setIsFilterApplied] = useState(false); // New state to track filter application
  const [showDateRange, setShowDateRange] = useState(false);
  
  const [dateRange, setDateRange] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]);

  const datePickerRef = useRef();
  const limit = 10; // Records per page
  const API_URL = "http://localhost:3000/api/admin/get-notification";

  // Fetch notifications from server
  const fetchNotifications = async (stDate = "", enDate = "") => {
    try {
    
  
      if (token) {
      
        setLoading(true);
  
        const requestBody = {
          stDate, 
        enDate, 
        };
  
        const response = await axios.post(
          API_URL, // Endpoint
          requestBody, // Request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page, // Query parameters
              limit,
            },
          }
        );
  
        console.log('API Response:', response.data);
  
        // Ensure the response contains the expected structure
        if (response.data && response.data.data) {
          setNotifications(response.data.data); // Set notifications
          setTotalPages(response.data.totalPages); // Set total pages
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      }
  
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notifications:', err.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
  

    // Fetch existing notifications on component mount
    if (isFilterApplied) {
      fetchNotifications(dateRange[0].startDate, dateRange[0].endDate);
    } else {
      fetchNotifications(); // Fetch all notifications if no filter is applied
    }
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
    
  }, [user,page,isFilterApplied]);
 

  const handleNextPage = (newPage) => {
    console.log('totalPages:', totalPages);
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage); 
    }
     
  };
  
  

  const handleFilterBtnClick = ()=>{
     
      setPage(1);
      setTotalPages(0);
    
    setShowDateRange(!showDateRange);
    setDateRange([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }])
    setIsFilterApplied(false); // Reset filter application when opening date range
  }

 
  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setShowDateRange(false); // Close the date range picker
      
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

  

  const handleApplyFilter = () => {
    const startDate = format(dateRange[0].startDate, 'yyyy-MM-dd'); 
    const endDate = format(dateRange[0].endDate, 'yyyy-MM-dd');
    setIsFilterApplied(true);
    fetchNotifications(startDate, endDate);
    
    setShowDateRange(false); // Date Range Picker को बंद करना
    
  };



  return (
    <div className='w-[100%]'>
      <MobileNavbar/>
     
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
        onChange={(ranges) => setDateRange([ranges.selection])}
             
            />
            <div className='w-[20%] justify-end'></div>
             <button
              onClick={handleApplyFilter}

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
  {notifications.length === 0 ? (
    <div className="text-center py-8 text-gray-500 w-full">No notifications to show</div>
  ) : (
    <ul className="w-full">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </ul>
  )}
</div>)}
{/* Pagination */}
{loading?<div></div>:( <div className=" flex justify-center mt-4 gap-4 items-center">
 <span className='mr-2' onClick={() => handleNextPage(page - 1)}
          disabled={page === 1}><FontAwesomeIcon icon={faArrowLeft} className='text-xl text-gray-600'/></span>
          
          <span className="text-xs text-semibold">Page {page} of {totalPages}</span>
          <span 
            onClick={() => handleNextPage(page + 1)} 
            disabled={page === totalPages}
            
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
