// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

export const protect = async (req, res, next) => {
  let token;

  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = user; // Attach user to request
      next();
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed', error: err.message });
  }
};
