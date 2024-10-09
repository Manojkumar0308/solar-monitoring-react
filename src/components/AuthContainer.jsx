import React from 'react';
import LoginForm from './LoginForm';
import SidePanel from './SidePanel';

const AuthContainer = ({ onLogin }) => {
  return (
    <div className="flex items-center md:flex-row justify-center h-screen">
      {/* SidePanel appears on larger screens */}
      <SidePanel />
      
      {/* Login Form is centered */}
      <div className="flex items-center justify-center w-full bg-gray-100">
        <LoginForm onLogin={onLogin} />  {/* Pass onLogin to LoginForm */}
      </div>
    </div>
  );
};

export default AuthContainer;
