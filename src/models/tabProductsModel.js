const mongoose = require('mongoose');

const tabProductsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0, // Le prix ne peut pas être négatif
  },
});

// Ajout de méthodes statiques pour getById et getAll
tabProductsSchema.statics.getById = async function (tabProductId) {
  return await this.findById(tabProductId).populate('productId');
};

tabProductsSchema.statics.getAll = async function () {
  return await this.find().populate('productId');
};

const Tabproducts = mongoose.model('Tabproducts', tabProductsSchema);

module.exports = Tabproducts;
