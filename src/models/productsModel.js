const mongoose = require('mongoose');

const customizationOptionSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  customizationSize: [{
    type: String,
    required: true,
  }],
});

const productSchema = new mongoose.Schema({
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
  }],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  characteristics: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number, 
    default: null,
  },
  isPromo: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  colors: [{
    type: String,
  }],
  sizes: [{
    type: String
  }],
  customizationOptions: [
    customizationOptionSchema
  ],
});

productSchema.statics.getById = async function (productId) {
  try {
    console.log('Tentative de récupération du produit avec ID :', productId);
    const product = await this.findById(productId).populate('category');
    console.log('Produit récupéré avec succès :', product);
    return product;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    throw error;
  }
};

productSchema.statics.getAll = async function () {
  try {
    console.log('Tentative de récupération de tous les produits...');
    const products = await this.find().populate('category');
    console.log('Produits récupérés avec succès :', products);
    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    throw error;
  }
};

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
