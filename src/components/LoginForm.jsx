import React from 'react';
import SocialLoginButton from './SocialLoginButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import  io  from 'socket.io-client'; // Import socket.io-client
import { useEffect ,useState} from 'react';
import  axios from 'axios';
import sockets from '../socket';
// Other imports remain unchanged

const LoginForm = ({ onLogin }) => {
  // Initialize navigate
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [socket, setSocket] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
 
  const handleLoginClick = async (e) => {
    e.preventDefault();
    console.log('Login button clicked'); 

    // Validate email and password
     // Validate email and password
     if (!email || !password) {
      setErrorMessage('Email and password are required.');
      console.log('Validation failed:', { email, password }); // Log validation failure
      return;
  }

  console.log('Logging in with:', { email, password });


    try {
      
        // Make API call to login
        const response = await axios.post('http://localhost:3000/api/user/login', {
            email,
            password,
        });
        console.log(response.status)
        const result = await response.data; // Parse the JSON response
        // Check if the response status is 200
        if (response.status===200) {
         
          sockets.connect();
          sockets.emit('login', { id: result.user._id, email: result.user.email });
            navigate('/dashboard'); 
        }
    } catch (error) {
        // Handle login failure
        if (error.response) {
            setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
        } else {
            setErrorMessage('Login failed. Please check your network connection.');
        }
        console.error('Login failed:', error);
    }
};

useEffect(() => {
  if (socket) {
      socket.on('connect', () => {
          console.log('Socket connected:', socket.id);
      });
      return () => {
          socket.disconnect(); // Clean up on component unmount
      };
  }
}, [socket]);


  return (
    <div className="flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>
      
      <form className="w-full max-w-sm px-4" >
        <FormInput type="email" label="Email" placeholder="Enter your email"   value={email}
                   onChange={(e) => {
                    setEmail(e.target.value);
                    console.log('Email updated:', e.target.value); // Log updated email
                  }} />
        <FormInput type="password" label="Password" placeholder="Enter your password"  value={password}
                    onChange={(e) => setPassword(e.target.value)} />
        
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
