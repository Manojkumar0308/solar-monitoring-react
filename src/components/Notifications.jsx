import React, { useState } from 'react';
import MobileNavbar from './MobileNavBar'; // Ensure this is implemented correctly
import DropdownButton from './DropdownButton';

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

    const usersName = [
        'User-1',
        'User-2',
        'User-3',
        'User-4',
        'User-5',
        'User-6',
        'User-7',
        'User-8',
        'User-9',
        'User-10',
        'User-11',
        'User-12',
        'User-13',
        'User-14',
        'User-15',
        'User-16',
        'User-17',
        'User-18',
        'User-19',
        'User-20',
        'User-21',
        'User-22',
        'User-23',
        'User-24',
        'User-25',
        'User-26',
        'User-27',
        'User-28',
    ];

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelect = (user) => {
        if (!selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleUserRemove = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u !== user));
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
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
                <div className="flex gap-4 mt-4">
                    <DropdownButton
                        label="Select Category"
                        items={categoryItems}
                        onSelect={handleUserSelect} // Pass handler to dropdown
                    />
                    <DropdownButton
                        label="Select Users"
                        items={usersName}
                        onSelect={handleUserSelect} // Pass handler to dropdown
                    />
                </div>

                {/* Selected Users */}
                <div className='text-xl font-semibold mt-[50px]'>Selected Users <span>{selectedUsers.length}</span></div>
                <div className='h-px w-full bg-gray-300 mt-[30px]'></div>
                <div className='flex gap-4 mt-12 flex-wrap'>
                    {selectedUsers.map((user) => (
                        <div key={user} className='flex items-center bg-blue-700 rounded-full px-4 py-1 gap-2 justify-center'>
                            <span className='text-xs text-white font-semibold'>{user}</span>
                            <button
                                onClick={() => handleUserRemove(user)}
                                className=' text-red-500 hover:text-red-700 font-bold'
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sendnotification;
