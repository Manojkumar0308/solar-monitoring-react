import React, { createContext, useContext } from 'react';
import { Store } from 'react-notifications-component';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {

  // Function to trigger notifications
  const addNotification = (notificationData) => {
    Store.addNotification({
      ...notificationData,
    });
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
