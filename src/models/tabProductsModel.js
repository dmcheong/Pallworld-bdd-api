const mongoose = require('mongoose');

const tabProductsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  color: String,
  size: String,
  customization: {
    position: String,
    customizationSize: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

tabProductsSchema.statics.getById = async function (tabProductId) {
  return await this.findById(tabProductId).populate('productId');
};

tabProductsSchema.statics.getAll = async function () {
  return await this.find().populate('productId');
};

const Tabproducts = mongoose.model('Tabproducts', tabProductsSchema);

module.exports = Tabproducts;
