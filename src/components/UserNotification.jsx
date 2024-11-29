import React, { useState, useEffect,useRef } from 'react';
import MobileNavbar from "./MobileNavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNotifications } from '../context/NotificationContext';

const UserNotification = () => {
  const { notifications, setNotifications ,page, setPage, totalPages, setTotalPages, loading, setLoading, handleNextPage, handleFilterBtnClick, handleApplyFilter, showDateRange, setShowDateRange, dateRange, setDateRange} = useNotifications();
  const datePickerRef = useRef();
 
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
