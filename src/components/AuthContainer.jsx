import React from 'react';
import {useAuth} from '../context/AuthContext/AuthContext';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SidePanel from './SidePanel';
import Signup from './Signup';
import { SignupProvider } from '../context/SignupContext/SignupContext'; // Import SignupProvider
const AuthContainer = () => {
  const {isLoggedIn,login,user} = useAuth();
  const location = useLocation();
  console.log('isLoggedIn:', isLoggedIn);
  console.log('user:', user);

  if (isLoggedIn) return null; // Redirect logic can be handled here if needed

  return (
    <div className="h-screen relative">
      <SidePanel />
      <div className="absolute inset-0 flex justify-center items-center">
        {location.pathname === '/signup' ?<SignupProvider><Signup /></SignupProvider> : <LoginForm />}
      </div>
    </div>
  );
};

export default AuthContainer;
