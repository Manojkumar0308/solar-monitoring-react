// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../../components/Loader';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // New state for token
  const [loading, setLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const loggedIn = sessionStorage.getItem('logedIn') === 'true';
    const savedToken = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
    if (loggedIn && userData) {
      setUser(userData);
      setIsLoggedIn(true);
      setToken(savedToken); // Set token if available
    }
    setLoading(false); // Set loading to false after checking
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
    sessionStorage.removeItem('activeTab');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('logedIn');
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
  };
  if (loading) {
    return (
    <Loader/>
      
    );
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext); // Ensure this returns the context
};