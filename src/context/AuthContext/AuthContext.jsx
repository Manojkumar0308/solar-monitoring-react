// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const { setLoading } = useLoading(); // Import loading context
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // New state for token
  const [loading, setLoading] = useState(false); // Add loading state
  
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const loggedIn = sessionStorage.getItem('logedIn') === 'true';
        const savedToken = sessionStorage.getItem('token');
        if (loggedIn && userData) {
          setUser(userData);
          setIsLoggedIn(true);
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };
  
    fetchData();
  }, []);

  const login = (userData,userToken) => {
    setUser(userData);
    setIsLoggedIn(true);
    setToken(userToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('logedIn', true);
    sessionStorage.setItem('token', userToken); // Save token in sessionStorage
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    sessionStorage.clear(); // Remove token from sessionStorage
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn,token,loading,setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext); // Ensure this returns the context
};