const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carNumber: String,
  brand: String,
  year: Number,
  model: String,
  variant: String,
  regState: String,
  kms: String,
  carImages: [String],
  carLocation: String,
  // carLocation: Number,
  customerName: String,
  customerEmail: String,
  ownerName: String,
  phone: String,
  whatsappUpdates: Boolean,
  sellingTimeline: String
});

module.exports = mongoose.model('NewCar', carSchema);