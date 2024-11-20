// LoginForm.js
import React, { useEffect, useState } from 'react';
import SocialLoginButton from './SocialLoginButton';
import FormInput from './FormInput';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext/AuthContext';
import { useActiveTab } from '../context/ActiveTab/ActiveTab';
import axios from 'axios';
import { initializeSocket } from '../socket'; // Import socket functions

const LoginForm = () => {
  const { login } = useAuth();
  const { setActiveTab } = useActiveTab();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Initialize socket connection after successful login
  
  const userData =response.data.user;
  const userToken = response.data.token; // Get the token from the response
  console.log('User role:', userData.role); // Console log the role here
  login(userData, userToken); // Pass user data and token to login
  initializeSocket(); // Initialize socket connection after successful login
  
  // Navigate based on user role
  const targetPath = userData.role === 'admin' ? '/dashboard' : '/userDashboard';
  setActiveTab(userData.role === 'admin' ? 'dashboard' : 'userDashboard'); // Set active tab based on user role
        navigate(targetPath, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your network connection.');
      } else {
        setErrorMessage('Login failed. Please try again later.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>

      <form className="w-full max-w-sm px-4">
        <FormInput type="email" label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <div className="flex justify-end mt-2">
          <Link to="/" className="text-sm text-blue-500 hover:underline font-semibold">Forgot Password?</Link>
        </div>
        
        <button type="submit" onClick={handleLoginClick} className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
        
        <p className="text-center text-gray-500 my-4">or</p>
        <SocialLoginButton type="google" label="Login with Google" />

        <p className="text-sm text-gray-600 mt-6 font-semibold">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
