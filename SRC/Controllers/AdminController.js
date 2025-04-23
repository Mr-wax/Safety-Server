// controllers/admin/getAllUsers.js

import User from '../Models/UserModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ message: 'All users fetched', users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User fetched', user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };

  
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { role, isVerified } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (role) user.role = role;
      if (typeof isVerified === 'boolean') user.isVerified = isVerified;
  
      await user.save();
  
      res.status(200).json({ message: 'User updated', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };

  
export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  };

  export const getReportById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await Report.findById(id).populate('user', 'email role');
      if (!report) return res.status(404).json({ message: 'Report not found' });
  
      res.status(200).json({ message: 'Report fetched', report });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report', error });
    }
  };

  export const updateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const report = await Report.findById(id);
      if (!report) return res.status(404).json({ message: 'Report not found' });
  
      report.status = status || report.status;
      await report.save();
  
      res.status(200).json({ message: 'Report status updated', report });
    } catch (error) {
      res.status(500).json({ message: 'Error updating report', error });
    }
  };

  export const deleteReport = async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await Report.findByIdAndDelete(id);
      if (!report) return res.status(404).json({ message: 'Report not found' });
  
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting report', error });
    }
  };