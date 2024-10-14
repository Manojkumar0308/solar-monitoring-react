import React, { useState } from "react";
import AuthContainer from "./components/AuthContainer"; // Ensure this path is correct
import Sidebar from "./components/Sidebar";
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Settings from './components/Settings';
import Profile from './components/Profile';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default tab
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <div className="h-screen">
      {/* Conditionally render the AuthContainer or the main dashboard */}
      {!isLoggedIn ? (
        <AuthContainer onLogin={() => setIsLoggedIn(true)} />  
      ) : (
        <>
        <div className="flex h-screen"> 
          <Sidebar setActiveTab={setActiveTab} />
          <div className="w-full overflow-y-auto">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab}/>}
            {activeTab === 'users' && <Users setActiveTab={setActiveTab}  showMobNavBar={true} />}
            {activeTab === 'settings' && <Settings setActiveTab={setActiveTab}/>}
            {activeTab === 'pro' && <Profile setActiveTab={setActiveTab}/>}
          </div>
          </div>
         
        </>
      )}
    </div>
  );
};

export default App;
