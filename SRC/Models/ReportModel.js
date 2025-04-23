// models/Report.js

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
  type: { type: String, 
    required: true }, // e.g., "robbery", "accident"
  description: { type: String, 
    required: true },
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  media: [String], // URLs to uploaded media
  anonymous: { type: Boolean, default: false },
  status: { type: String, default: 'pending' }, // "pending", "in_progress", "resolved"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
