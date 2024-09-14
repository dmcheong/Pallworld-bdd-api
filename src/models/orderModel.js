const mongoose = require('mongoose');

const customizationOptionSchema = new mongoose.Schema({
  position: String,
  customizationSize: String,
  imageUrl: String,
});

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: String,
  size: String,
  customizationOptions: [customizationOptionSchema],
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    postalCode: String,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
