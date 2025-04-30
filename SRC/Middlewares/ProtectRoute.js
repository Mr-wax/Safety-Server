// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Still useful for debugging

    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(400).json({ message: "Invalid user ID format in token" });
    }

    // Fetch the full user document from DB
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ✅ This gives access to user._id, user.role, etc.
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};

