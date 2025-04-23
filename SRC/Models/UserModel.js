// models/User.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['user', 'security_officer', 'admin'],
    default: 'user'
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  profilePhoto: {
    type: String,
    default: ''
  },

  otp: {
    type: String,
    maxlength: 4 // ensures no more than 4 digits
  },

  otpExpiry: {
    type: Date
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },

  emergencyContacts: [
    {
      name: String,
      phone: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ location: '2dsphere' });

const User = model('User', userSchema);

export default User;
