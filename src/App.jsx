import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContext';
import { ActiveTabProvider } from './context/ActiveTab/ActiveTab';
import {SidebarToggleProvider} from './context/SidebarToggle/SidebarToggleContext'
import { DropdownProvider } from "./context/DropDownContext/DropdownContext";
import AuthContainer from "./components/AuthContainer";
import Sidebar from "./components/Sidebar";
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Settings from './components/Settings';
import Profile from './components/Profile';
import UserDashBoard from "./components/UserDashboard";
import Sendnotification from "./components/Notifications";
import UserNotification from "./components/UserNotification";
import { ReactNotifications } from 'react-notifications-component';
import { NotificationProvider } from '../src/context/NotificationContext';  
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js

import Tables from "./components/Table";


const App = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn,role } = useAuth();
  console.log(user, isLoggedIn); // Check if user is coming from context
 
 
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
      <ActiveTabProvider> {/* Wrap with ActiveTabProvider */}
          <DropdownProvider>
          <Router>
      <div className="h-screen">
      <ReactNotifications />
        {/* Conditionally render the AuthContainer or the main dashboard */}
        {!isLoggedIn ? (
           <AuthContainer />
        ) : (
          <div className="flex h-screen"> 
          <DropdownProvider>
            <Sidebar />           
            <div className="w-full overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard  />} />
                <Route path="/users" element={<Tables  showMobNavBar={true} />} />
                <Route path="/settings" element={<Settings  />} />
                <Route path="/profile" element={<Profile  />} />
                <Route path="/userDashboard" element={<UserDashBoard  />} />
                <Route path="/sendnotification" element={<Sendnotification  />}/>
                <Route path="notifications" element={<UserNotification  />} />
                <Route path="support" element={<UserDashBoard />} /> 
                <Route path="/" element={<AuthContainer />} /> {/* Default route */}
              </Routes>

            </div>
            </DropdownProvider>
          </div>
          
        )}
      </div>
    </Router>
          </DropdownProvider>
    
    </ActiveTabProvider>
      </SidebarToggleProvider>
     
    </NotificationProvider>
   
  );
};

export default App;
