const mongoose = require('mongoose');
const { hashPasswordMiddleware } = require('../middlewares/hashPassword');
const { verifyPasswordMiddleware } = require('../middlewares/hashPassword');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  country: String,
  city: String,
  address: String,
  codePostal: Number,
  credits: Number,
  historique: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paniers',
  }],
});

// Middleware pre-save pour hacher le mot de passe avant la sauvegarde
userSchema.pre('save', hashPasswordMiddleware);

// Ajout d'un méthode pour vérifier le mot de passe
userSchema.methods.verifyPassword = async function (password) {
  return await verifyPasswordMiddleware(password, this);
};

// Ajout de méthodes statiques pour getById et getAll
userSchema.statics.getById = async function (userId) {
  return await this.findById(userId).populate('historique');
};

userSchema.statics.getAll = async function () {
  return await this.find().populate('historique');
};

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
