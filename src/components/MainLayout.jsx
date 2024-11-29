import React, {  } from "react";
import { Route, Routes } from 'react-router-dom';
// import { useSidebarToggle } from './context/SidebarToggle/SidebarToggleContext';
import { DropdownProvider } from "../context/DropDownContext/DropdownContext";
import AuthContainer from "../components/AuthContainer";
import Sidebar from "../components/Sidebar";
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import Profile from '../components/Profile';
import UserDashBoard from "../components/UserDashboard";
import Sendnotification from "../components/Notifications";
import UserNotification from "../components/UserNotification";
import Tables from "../components/Table";
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js

import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import { UserPlantProvider } from "../context/UserPlantContext/UserPlantContext";
import {UserProvider} from "../context/AllUserContext/AllUserContext";
import { NotificationProvider } from "../context/NotificationContext";
export const MainLayout = () => {
    const { isSidebarOpen } = useSidebarToggle();
    
    return (
      <div className="flex h-screen">
        <DropdownProvider>
           
            {!isSidebarOpen && <Sidebar />}
          
          <div className="w-full overflow-y-auto ">
            <Routes>
              <Route path="/dashboard" element={
                  <UserPlantProvider>
                <Dashboard /> </UserPlantProvider>} />
              <Route path="/users" element={
                <UserPlantProvider>
                   <Tables showMobNavBar={true} />
                </UserPlantProvider>
               
               
                } />
              <Route path="/settings" element={<Settings  />} />
                <Route path="/profile" element={<Profile  />} />
                <Route path="/userDashboard" element={
                  
                    <UserDashBoard  />
                  
                  } />
                <Route path="/sendnotification" element={
                 
                  
                  <UserProvider>
                    <Sendnotification  />
                  </UserProvider>
                  }/>
                <Route path="notifications" element={
                  <NotificationProvider>  
                  <UserNotification  /></NotificationProvider>} />
                <Route path="support" element={<UserDashBoard />} /> 
                
                <Route path="/" element={<AuthContainer />} /> {/* Default route */}
            </Routes>
          </div>
           
      
        </DropdownProvider>
      </div>
    );
  };