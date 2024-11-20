// ActiveTabContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(() => {
    // Retrieve the active tab from localStorage or default to an empty string
    return localStorage.getItem('activeTab') || '';
  });

  useEffect(() => {
    // Store the active tab in localStorage whenever it changes
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};