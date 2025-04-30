import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    // required : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: { 
    type: String, 
    enum: ["user", "admin", "security"], 
    default: "user" }, 

  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpiry: Date,
  profilePhoto: {
    type: [String],
  },
  emergencyContacts: [
    {
      name: { 
        type: String,
         required: true },
      email: {
         type: String, 
         required: true },
      phone: { type: 
        String }, // Optional, in case you later want to send SMS
    }
  ],
  
  phoneNumber: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  accountName: {
    type: String,
  },
  bank: {
    type: String,
  },  facebookLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
});

const User = mongoose.model('User',userSchema)
export default User