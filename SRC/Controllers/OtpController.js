// controllers/auth/sendOtp.js

import User from '../Models/UserModel.js';

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // TODO: send OTP via email or SMS (e.g. using nodemailer or Twilio)
    console.log(`OTP for ${email}: ${otp}`); // Replace this with email/SMS logic

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send OTP', error });
  }
};


export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const isOtpValid = user.otp === otp && user.otpExpiry > new Date();

    if (!isOtpValid) {
      return res.status(400).json({ message: 'OTP is invalid or expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify OTP', error });
  }
};
