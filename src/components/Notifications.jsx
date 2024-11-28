// Sendnotification.js
import React, { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavBar'; // Ensure this is implemented correctly
import DropdownButton from './DropdownButton';
import Example from './JoditEditor';
import { useUsers } from '../context/AllUserContext/AllUserContext'; // Import the custom hook

const Sendnotification = ({ isSidebarOpen, toggleSidebar }) => {
    const categoryItems = [
        'Option-1',
        'Option-2',
        'Option-3',
        'Option-4',
        'Option-5',
        'Option-6',
        'Option-7',
        'Option-8',
    ];

    const [selectedUsers, setSelectedUsers] = useState([]);
    const { users, loading, error } = useUsers(); // Fetch users from the context

    const handleUserSelect = (userEmail) => {
        // Add user email to selectedUsers if not already selected
        if (!selectedUsers.includes(userEmail)) {
            setSelectedUsers([...selectedUsers, userEmail]);
        }
    };

    const handleUserRemove = (userEmail) => {
        setSelectedUsers(selectedUsers.filter((email) => email !== userEmail));
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='max-w-full h-screen flex flex-col'>
            <MobileNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}    
            />

            <div className='h-screen min-w-full bg-white py-8 px-4'>
                <h1 className='text-xl font-bold items-center'>Notifications</h1>
                <div className='h-px w-full bg-gray-300 mt-[18px]'></div>
                <p className='text-xl font-semibold mt-[50px]'>Select Category</p>
                <div className="flex flex-col md:flex-row  gap-4 mt-4">
                    <DropdownButton
                        label="Select Category"
                        items={categoryItems}
                        onSelect={handleUserSelect} // Pass handler to dropdown
                    />
                    <DropdownButton
                        label="Select Users"
                        items={users.map((user) => user.email)} // Map users to email addresses
                        onSelect={handleUserSelect} // Pass handler to dropdown
                    />
                </div>

                {/* Selected Users */}
                <div className='text-xl font-semibold mt-[50px]'>
                    Selected Users <span>{selectedUsers.length}</span>
                </div>
                <div className='h-px w-full bg-gray-300 mt-[30px]'></div>
                <div className='flex gap-4 mt-12 flex-wrap'>
                    {selectedUsers.map((userEmail) => (
                        <div key={userEmail} className='flex items-center bg-blue-700 rounded-full px-4 py-1 gap-2 justify-center'>
                            <span className='text-xs text-white font-semibold'>{userEmail}</span>
                            <button
                                onClick={() => handleUserRemove(userEmail)}
                                className=' text-red-500 hover:text-red-700 font-bold'
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <div>
       
       <Example placeholder="Enter your text here" />
      </div>
            </div>
        </div>
    );
}

export default Sendnotification;
