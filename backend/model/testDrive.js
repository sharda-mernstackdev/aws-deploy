const mongoose = require('mongoose');

const testDriveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['scheduled', 'cancelled','complate'], default: 'scheduled' },
});

const TestDrive = mongoose.model('TestDrive', testDriveSchema);

module.exports = TestDrive;

