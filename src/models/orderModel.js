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
  isTokenPurchase: {
    type: Boolean,
    default: false,
  },
  tokensQuantity: {
    type: Number,
    default: 0,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
