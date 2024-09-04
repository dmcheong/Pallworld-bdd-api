const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const caPath = path.resolve(__dirname, '../src/config/ca.pem');
const uri = process.env.MONGODB_URI;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsCAFile: caPath,
  tlsAllowInvalidCertificates: true,
};

mongoose.connect(uri, mongoOptions);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Le test de connexion à MongoDB est un succès');
  process.exit(0);
});

module.exports = mongoose;
