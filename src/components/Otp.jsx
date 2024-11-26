import { de } from 'date-fns/locale';
import React, { useState, useRef } from 'react';

 const OTPInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input on backspace
    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: '40px',
            height: '40px',
            margin: '0 5px',
            textAlign: 'center',
            fontSize: '18px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;