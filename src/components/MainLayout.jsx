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
import OTPInput  from "../components/Otp";
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js

import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import { UserPlantProvider } from "../context/UserPlantContext/UserPlantContext";
export const MainLayout = () => {
    const { isSidebarOpen } = useSidebarToggle();
    
    return (
      <div className="flex h-screen">
        <DropdownProvider>
           <UserPlantProvider>
            {!isSidebarOpen && <Sidebar />}
          
          <div className="w-full overflow-y-auto ">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Tables showMobNavBar={true} />} />
              <Route path="/settings" element={<Settings  />} />
                <Route path="/profile" element={<Profile  />} />
                <Route path="/userDashboard" element={<UserDashBoard  />} />
                <Route path="/sendnotification" element={<Sendnotification  />}/>
                <Route path="notifications" element={<UserNotification  />} />
                <Route path="support" element={<UserDashBoard />} /> 
                
                <Route path="/" element={<AuthContainer />} /> {/* Default route */}
            </Routes>
          </div>
           
       </UserPlantProvider>
        </DropdownProvider>
      </div>
    );
  };