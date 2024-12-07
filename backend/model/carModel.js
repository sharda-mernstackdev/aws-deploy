const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  kilometer: { type: Number, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  vehicleNumber: { type: String, required: true }, // Changed to String
  fuelType: { type: String, required: true },
  description: { type: String },
  owner: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [ImageSchema],
  createdAt: { type: Date, default: Date.now },
});


const Car = mongoose.model('Car', carSchema);

module.exports = Car;