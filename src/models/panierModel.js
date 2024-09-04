const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
  totalPrice: {
    type: String,
    required: true,
    min: 0, // Le prix ne peut pas être négatif
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  tabProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tabproducts',
    required: true,
  }],
});

// Ajout de méthodes statiques pour getById et getAll
panierSchema.statics.getById = async function (panierId) {
  return await this.findById(panierId).populate('tabProducts');
};

panierSchema.statics.getAll = async function () {
  return await this.find().populate('tabProducts');
};

const Paniers = mongoose.model('Paniers', panierSchema);

module.exports = Paniers;
