// utils/otp.js

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // always 4 digits
  };
  