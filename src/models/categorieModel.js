const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

categorieSchema.statics.getById = async function (categorieId) {
  return await this.findById(categorieId);
};

categorieSchema.statics.getAll = async function () {
  return await this.find();
};

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
