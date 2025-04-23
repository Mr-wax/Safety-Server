// controllers/auth/register.js

import User from '../Models/UserModel.js';
import { hashPassword } from '../Utils/CryptoHash.js';
import validatePassword from '../Validators/Validator.js';
import { generateOTP } from '../Utils/Otp.js';
import generateTokenAndSetCookie from '../Utils/GenerateTokenAndSetCookie.js';

export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const { isValid, message } = validatePassword(password);
    if (!isValid) return res.status(400).json({ message });

    const hashedPassword = hashPassword(password);
    const otp = generateOTP();

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    // Send OTP via email
    await sendEmail(email, 'Verify Your Email', `Your verification OTP is: ${otp}`);

    res.status(201).json({
      message: 'User registered. OTP sent to email for verification.',
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    const newOtp = generateOTP();
    user.otp = newOtp;
    await user.save();

    await sendEmail(email, 'Resend OTP', `Your new OTP is: ${newOtp}`);

    res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resend OTP', error });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = verifyPassword(password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Incorrect password' });

    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your account first' });

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP(); // generate a new 4-digit OTP
    user.otp = otp;
    await user.save();

    // Here you can send the OTP via email/SMS.
    console.log(`Password reset OTP for ${email}: ${otp}`);

    res.status(200).json({
      message: 'OTP sent to your email/phone for password reset',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request', error });
  }
};


export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Validate new password
    const { isValid, message } = validatePassword(newPassword);
    if (!isValid) {
      return res.status(400).json({ message });
    }

    user.password = hashPassword(newPassword);
    user.otp = null; // clear OTP after successful reset
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error });
  }
};