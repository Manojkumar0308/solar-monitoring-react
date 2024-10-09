import React,{useState} from "react";
import MobNavBar from "./MobileNavBar";
const Settings =({isSidebarOpen,toggleSidebar,setActiveTab})=>{
    
    return(
        <div className="max-w-full bg-gray-100 dark:bg-gray-900">
               {/* Use MobileNavbar component */}
      <MobNavBar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} setActiveTab={setActiveTab}
      />
        </div>
    );
}
export default Settings;