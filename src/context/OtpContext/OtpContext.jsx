import React, { createContext, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';
import {signUpUser} from '../SignupContext/SignupContext';
const OtpContext = createContext();

export const OtpProvider = ({ length = 6, children }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [loading,setLoading] = useState(false);
  const inputs = useRef([]);
// Accessing regEmail from SignupContext
const { regEmail } = signUpUser();  // Destructure regEmail from context
const navigate = useNavigate();
  // Handle input changes
   
  const handleChange = (value, index) => {
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      console.log('OTP:', newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }

    // Move focus to previous input on empty value
    if (value === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Handle keydown events (e.g., Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Clear the OTP
  const clearOtp = () => setOtp(Array(length).fill(''));
  const otpValue = otp.join(''); // Combine OTP array into a single string
   const reqbody = {
    email:regEmail,
    token: otpValue
   };
  const verifyOtp = async () => {
    try {
        console.log('reqbody  :', reqbody);
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/user/verify-email',
        reqbody
      );
      console.log('reqbody  :', reqbody);
      console.log(' Response:', response);
      if (response?.status === 200) {
        console.log('OTP verified. Navigating to dashboard...');
        setLoading(false);
        navigate('/login', { replace: true });
      }else{
        setLoading(false);
        console.log('OTP verification failed.');
      }
    } catch (err) {
        setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <OtpContext.Provider
      value={{
        otp,
        setOtp,
        clearOtp,
        handleChange,
        handleKeyDown,
        verifyOtp,
        inputs,
        length,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => useContext(OtpContext);
