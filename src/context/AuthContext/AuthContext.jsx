// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // New state for token
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('logedIn') === 'true';
    const savedToken = localStorage.getItem('token'); // Retrieve token from localStorage
    if (loggedIn && userData) {
      setUser(userData);
      setIsLoggedIn(true);
      setToken(savedToken); // Set token if available
    }
  }, []);

  const login = (userData,userToken) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('logedIn', true);
    localStorage.setItem('token', userToken); // Save token in localStorage
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('activeTab');
    localStorage.removeItem('user');
    localStorage.removeItem('logedIn');
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext); // Ensure this returns the context
};