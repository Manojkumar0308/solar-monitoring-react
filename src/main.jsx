import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the path as needed
import './index.css'; // If you have a CSS file for Tailwind
import {AuthProvider} from '../src/context/AuthContext/AuthContext'
import {PasswordVisibilityProvider} from '../src/context/PasswordVisibilityContext/PasswordVisibilityContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {/* Wrap AuthProvider here */}
    <AuthProvider>
    <PasswordVisibilityProvider>
      <App />
      
      </PasswordVisibilityProvider>
    </AuthProvider>
  </React.StrictMode>
);
