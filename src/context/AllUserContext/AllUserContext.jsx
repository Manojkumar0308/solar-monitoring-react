// context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// UserContext Provider Component
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace `{{base_url}}` with your actual base URL
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user/get-user');
                console.log('response:', response);
                const data = await response.json();
                setUsers(data.users); // Assuming the API returns a field `users` containing an array of user objects
                setLoading(false);
            } catch (err) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUsers = () => useContext(UserContext);
