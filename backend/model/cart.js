// models/Cart.js
const mongoose = require ('mongoose')

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    }
  }]
}, { timestamps: true });


const cart=  mongoose.model('Cart', CartSchema);

module.exports = cart