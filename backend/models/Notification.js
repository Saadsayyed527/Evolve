const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pickup', required: true },
  read: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

// Corrected export statement
module.exports = Notification;