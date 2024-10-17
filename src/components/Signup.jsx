import React from 'react';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
// Other imports remain unchanged

const Signup = () => {
    return (
        <div className="flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
            <p className="text-sm text-gray-600 mb-4">Welcome! Please register your account.</p>
            <form className="w-full max-w-sm px-4">
                <FormInput type="firstname" label="First Name" placeholder="Enter your first name" />
                <FormInput type="lastname" label="Last Name" placeholder="Enter your last name" />
                <FormInput type="email" label="Email" placeholder="Enter your email" />
                <FormInput type="mobile" label="Mobile Number" placeholder="Enter your mobile number" />
                <FormInput type="password" label="Password" placeholder="Enter your password" />
                
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
                    Sign Up
                </button>
            </form>
            <p className="text-sm md:text-gray-100 text-gray-600 mt-6 md:font-semibold">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
