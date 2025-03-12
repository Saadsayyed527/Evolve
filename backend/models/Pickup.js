const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Pickup', pickupSchema);