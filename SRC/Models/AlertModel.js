import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    latitude: { 
        type: Number, 
        required: true },
    longitude: {
        type: Number, 
        required: true }
  },
  alertType: {
    type: String,
    enum: ['Medical', 'Security', 'Fire', 'Other'],
    default: 'Other'
  },
  message: {
    type: String,
    default: ''
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
