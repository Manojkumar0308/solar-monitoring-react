// LoginForm.js
import React, { useState ,useRef,useEffect} from 'react';
import SocialLoginButton from './SocialLoginButton';
import FormInput from './FormInput';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext/AuthContext';
import { useActiveTab } from '../context/ActiveTab/ActiveTab';
import {usePasswordVisibility} from '../context/PasswordVisibilityContext/PasswordVisibilityContext';
import axios from 'axios';
import { initializeSocket } from '../socket'; // Import socket functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { Dialog, CircularProgress, Box , DialogActions, DialogContent, DialogTitle, Button, } from '@mui/material'; // Material-UI imports
import { set } from 'date-fns';

import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const { login,loading,setLoading } = useAuth();
  // const [loading, setLoading ]= useState(false);
  const { setActiveTab } = useActiveTab();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shakeDialog, setShakeDialog] = useState(false);  // State to handle shake effect
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const [dialogMessage, setDialogMessage] = useState('');  // Dialog message state
  const [dialogOpen, setDialogOpen] = useState(false);  // State to manage dialog visibility
  const dialogRef = useRef();
  // const isPasswordField = type === 'password';

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setDialogMessage(`${!email?"email can't be empty":"password can't be empty"}`);
      setDialogOpen(true);
     
      return;
    }

    try {
      setLoading(true);
     const  response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      },{
        headers: {
          'Content-Type': 'application/json', // Make sure content type is set correctly
        },
     });
     setLoading(false); 
     console.log(response);  
      if (response.status === 200) {  
  const userData =response.data.user;
  const userToken = response.data.token; // Get the token from the response
 
  console.log('User role:', userData.role); // Console log the role here
  login(userData, userToken); // Pass user data and token to login
  sessionStorage.setItem('logedIn', true);
  initializeSocket(); // Initialize socket connection after successful login
   setActiveTab(userData.role === 'admin' ? 'dashboard' : 'userDashboard'); 
      const targetPath = userData.role === 'admin' ? '/dashboard' : '/userDashboard';
      navigate(targetPath, { replace: true });
 
  } else {
    // Login failed (invalid credentials)
    setDialogMessage('Wrong Credentials');
    setShakeDialog(true);  
    setDialogOpen(true);
  }
} catch (error) {
  setLoading(false);
  console.log('Login error:', error);
  setDialogMessage(`${error.message}`);
  setShakeDialog(true);  
  setDialogOpen(true);
}
  
  };
  

useEffect(() => {
  if (loading && dialogRef.current) {
    dialogRef.current.focus();
  }
}, [loading]);


  return (
    <div className={`flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen `}>


   
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>

      <form className="w-full max-w-sm px-4" autoComplete='off'>
        <FormInput type="email" autoComplete='off' label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        {/* <FormInput type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        <div className="flex relative items-center justify-center">
          {/* <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label> */}
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete='off'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
           <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
          >
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              className="text-gray-400"
            />
          </button>
        </div>
        
        <div className="flex justify-end mt-2">
          <Link to="/" className="text-sm text-blue-500 md:text-white hover:underline font-semibold">Forgot Password?</Link>
        </div>
        
        <button type="submit" onClick={handleLoginClick} className="w-full bg-blue-500 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
          {loading ? 'Logging in...' : 'Login'}

        </button>
        
        <p className="text-center text-gray-500 my-4">or</p>
        <SocialLoginButton type="google" label="Login with Google" />

        <p className="text-sm text-gray-600 md:text-gray-100 mt-6 font-semibold">
          Don't have an account? <Link to="/signup" className="text-blue-500 md:text-white hover:underline">Sign up</Link>
        </p>
      </form>


        {/* Error Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="login-dialog-title"  className={shakeDialog ? 'animate-shake' : ''}>
        <DialogTitle className = 'text-red-500 text-semibold' id="login-dialog-title">{dialogMessage.includes('Success') ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <p className='text-xs'>{dialogMessage}</p>
          <p className={`${(!email || !password) ? 'hidden' : 'block'} text-red-500 text-xs`}> Please login with correct credentials.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary" className='text-xs'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Loading Dialog */}
      <Dialog open={loading}  onClose={() => setLoading(false)} closeAfterTransition={false}
          ref={dialogRef} aria-labelledby="loading-dialog-title">
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
          <CircularProgress />
          <p className="mt-2 text-gray-700">Logging in...</p>
        </Box>
      </Dialog>
    </div>
  );
};

export default LoginForm;
