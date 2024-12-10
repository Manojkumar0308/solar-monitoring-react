import React,{useState,useEffect} from "react";
import { BrowserRouter as Router,useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContext';
import { ActiveTabProvider } from './context/ActiveTab/ActiveTab';
import {SidebarToggleProvider} from './context/SidebarToggle/SidebarToggleContext';
import AuthContainer from "./components/AuthContainer";
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js
import { MainLayout } from "./components/MainLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Loader from "./components/Loader";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useActiveTab } from "./context/ActiveTab/ActiveTab";
import { useDialog } from "./context/DialogContext/DialogContext";
const App = () => {
  const {loading,logout } = useAuth();
const {setActiveTab} = useActiveTab();
const {showDialog,hideDialog} = useDialog();
const navigate = useNavigate(); // To navigate programmatically
const isLogedIn = sessionStorage.getItem('logedIn');
const tokenExpiryTime = sessionStorage.getItem('tokenExpiry'); // Get stored token expiry time
const currentTime = new Date().getTime();
const isTokenExpired = tokenExpiryTime && currentTime > tokenExpiryTime;



useEffect(() => {
  if (isTokenExpired) {
    // Show dialog and logout the user
    showDialog({
      type: 'message',
      title: 'Session Expired',
      message: 'Your session has expired. Please log in again.',
      actions: [{ label: 'Close', onClick: hideDialog }],
    });
    logout(); // Log out the user immediately
setActiveTab('')
    // Clear session storage to remove token data
    sessionStorage.clear();
    // navigate('/'); // Redirect to the login screen
  }
}, [isTokenExpired, logout, navigate, setActiveTab]);

  return (
    <SidebarToggleProvider>
     
          <div className={`h-screen `}>
            {(!isLogedIn || isTokenExpired )? <AuthContainer /> : <MainLayout />}
          </div>     
    </SidebarToggleProvider>
  );
};

export default App;
