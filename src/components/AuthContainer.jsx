import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SidePanel from './SidePanel';
import Signup from './Signup';

const AuthContainer = ({ onLogin }) => {
  const location = useLocation();

  return (
    <div className="h-screen relative">
      {/* SidePanel fills the background */}
      <SidePanel />

      {/* Center the LoginForm or Signup */}
      <div className="absolute inset-0 flex justify-center items-center">
        {location.pathname === '/signup' ? (
          <Signup />
        ) : (
          <LoginForm onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
