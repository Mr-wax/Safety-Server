// utils/validatePassword.js

/**
 * Validates the password based on required strength rules
 * @param {string} password
 * @returns {Object} { isValid: boolean, message: string }
 */
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
    if (!password || password.length < minLength) {
      return {
        isValid: false,
        message: `Password must be at least ${minLength} characters long`,
      };
    }
  
    if (!hasUpper || !hasLower || !hasNumber || !hasSymbol) {
      return {
        isValid: false,
        message:
          'Password must include uppercase, lowercase, number, and special character',
      };
    }
  
    return { isValid: true, message: 'Password is valid' };
  };
  
  export default validatePassword;
  