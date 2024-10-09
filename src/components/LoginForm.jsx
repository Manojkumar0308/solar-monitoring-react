import React from 'react';
import FormInput from './FormInput';
import SocialLoginButton from './SocialLoginButton';

const LoginForm = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(); // Trigger login
  };

  return (
    <div className="flex flex-col items-center bg-white md:w-full w-full justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 justify-center">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>
      
      <form className="w-full max-w-sm px-4" onSubmit={handleLogin}>
        <FormInput type="email" label="Email" placeholder="Enter your email" />
        <FormInput type="password" label="Password" placeholder="Enter your password" />
        
        <div className="flex justify-end mt-2">
          <a href="/" className="text-sm text-blue-500 hover:underline">Recovery Password</a>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
        
        <p className="text-center text-gray-500 my-4">or</p>
        
        <SocialLoginButton type="google" label="Login with Google" />
      </form>

      <p className="text-sm text-gray-600 mt-6">Don't have an account? <a href="/" className="text-blue-500 hover:underline">Sign up</a></p>
    </div>
  );
};

export default LoginForm;
