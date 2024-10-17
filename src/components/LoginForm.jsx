import React from 'react';
import SocialLoginButton from './SocialLoginButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FormInput from './FormInput';
import { Link } from 'react-router-dom';

// Other imports remain unchanged

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize navigate
  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin();
    // Trigger login state change
    navigate('/dashboard'); // Redirect to the Dashboard
  };

  return (
    <div className="flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>
      
      <form className="w-full max-w-sm px-4" >
        <FormInput type="email" label="Email" placeholder="Enter your email" />
        <FormInput type="password" label="Password" placeholder="Enter your password" />
        
        <div className="flex justify-end mt-2">
          <Link to="/" className="text-sm md:text-gray-100 text-blue-500 hover:underline md:font-semibold">Forgot Password?</Link>
        </div>
        
        <button type="submit" onClick={handleLoginClick} className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
        
        <p className="text-center text-gray-500 my-4">or</p>
        
        <SocialLoginButton type="google" label="Login with Google" />

        <p className="text-sm md:text-gray-100 text-gray-600 mt-6 md:font-semibold ">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
