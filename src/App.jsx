import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('dashboard'); // Default tab
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('logedIn') === 'true';

    if (loggedIn && userData) {
      setUser(userData.user);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <NotificationProvider>
       <Router>
      <div className="h-screen">
      <ReactNotifications />
        {/* Conditionally render the AuthContainer or the main dashboard */}
        {!isLoggedIn ? (
           <AuthContainer onLogin={() => setIsLoggedIn(true)} setUser={setUser} user={user} />
        ) : (
          <div className="flex h-screen"> 
          
             {isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} setActiveTab={setActiveTab} activeTab={activeTab} />}
            <div className="w-full overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/users" element={<Tables setIsLoggedIn={setIsLoggedIn} setActiveTab={setActiveTab} showMobNavBar={true} activeTab={activeTab}/>} />
                <Route path="/settings" element={<Settings setIsLoggedIn={setIsLoggedIn} setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/userDashboard" element={<UserDashBoard setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/sendnotification" element={<Sendnotification setIsLoggedIn={setIsLoggedIn} setActiveTab={setActiveTab} activeTab={activeTab}/>}/>
                <Route path="notifications" element={<UserNotification setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} setActiveTab={setActiveTab} showMobNavBar={true} activeTab={activeTab}/>} />
                <Route path="/" element={<AuthContainer />} /> {/* Default route */}
              </Routes>
            </div>
           
          </div>
        )}
      </div>
    </Router>
    </NotificationProvider>
   
  );
};

export default App;
