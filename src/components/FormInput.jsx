import React from 'react';

const FormInput = ({ type, label, placeholder,value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default FormInput;
