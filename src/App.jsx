import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContext';
import { ActiveTabProvider } from './context/ActiveTab/ActiveTab';
import {SidebarToggleProvider} from './context/SidebarToggle/SidebarToggleContext';
import AuthContainer from "./components/AuthContainer";

import { ReactNotifications } from 'react-notifications-component';
import { NotificationProvider } from '../src/context/NotificationContext';  
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js

import { MainLayout } from "./components/MainLayout";


const App = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn,role } = useAuth();
  console.log(user, isLoggedIn); // Check if user is coming from context
  // const {isSidebarOpen} = useSidebarToggle();
 
  useEffect(() => {
    if (user) {
      // Set the active tab based on user role
      console.log(user.role);
      // setActiveTab(user.role === 'admin' ? 'dashboard' : 'userDashboard');
    }
  }, [user]); 
  return (
    <NotificationProvider>
    <SidebarToggleProvider>
      <ActiveTabProvider>
     
          <Router>
            <div className="h-screen">
              <ReactNotifications />
              {!isLoggedIn ? (
              
                <AuthContainer />
              
                
             
              ) : (
                <MainLayout />
              )}
            </div>
          </Router>
        
      </ActiveTabProvider>
    </SidebarToggleProvider>
  </NotificationProvider>
   
  );
};

export default App;
