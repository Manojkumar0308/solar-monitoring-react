import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContainer from "./components/AuthContainer";
import Sidebar from "./components/Sidebar";
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Settings from './components/Settings';
import Profile from './components/Profile';
import UserDashBoard from "./components/UserDashboard";
import Sendnotification from "./components/Notifications";
import Tables from "./components/Table";

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default tab
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <Router>
      <div className="h-screen">
        {/* Conditionally render the AuthContainer or the main dashboard */}
        {!isLoggedIn ? (
          <AuthContainer onLogin={() => setIsLoggedIn(true)} />  
        ) : (
          <div className="flex h-screen"> 
            <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            <div className="w-full overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/users" element={<Tables setActiveTab={setActiveTab} showMobNavBar={true} activeTab={activeTab}/>} />
                <Route path="/settings" element={<Settings setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/profile" element={<Profile setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/userDashboard" element={<UserDashBoard setActiveTab={setActiveTab} activeTab={activeTab}/>} />
                <Route path="/sendnotification" element={<Sendnotification setActiveTab={setActiveTab} activeTab={activeTab}/>}/>
                <Route path="/" element={<Navigate to="/dashboard" activeTab={activeTab}/>} /> {/* Default route */}
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
