import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContext';
import { ActiveTabProvider } from './context/ActiveTab/ActiveTab';
import {SidebarToggleProvider} from './context/SidebarToggle/SidebarToggleContext';
import AuthContainer from "./components/AuthContainer";
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js

import { MainLayout } from "./components/MainLayout";
import Loader from "./components/Loader";


const App = () => {
  const {loading  } = useAuth();
const isLogedIn = sessionStorage.getItem('logedIn');
 
// if(loading&& isLogedIn){
//   return(
//     <Loader/>
//   )
// }
  if(!isLogedIn){
    return(
      <SidebarToggleProvider>
        <ActiveTabProvider>
        
            <Router>
              <div className="h-screen">
             
             
                  <AuthContainer />   
            
             
              </div>
            </Router>
          
        </ActiveTabProvider>
      </SidebarToggleProvider>
       
      
    );
  }
 
    return (
 

      <SidebarToggleProvider>
        <ActiveTabProvider>
        
            <Router>
              <div className="h-screen">
             
           
                  
                  <MainLayout />
              
              </div>
            </Router>
          
        </ActiveTabProvider>
      </SidebarToggleProvider>
     
    
     
    );

 

};

export default App;
