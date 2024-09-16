const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoose = require('./src/config/mongodb-config');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Route de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre API Pallworld!');
});

// Import des routes pour chaque entité
const usersRoutes = require('./src/routes/usersRoutes');
const panierRoutes = require('./src/routes/panierRoutes');
const productRoutes = require('./src/routes/productsRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const tabProductsRoutes = require('./src/routes/tabProductsRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const generatedImagesRoutes = require('./src/routes/generatedImagesRoutes');

// Import de la nouvelle route pour les commandes
const ordersRoutes = require('./src/routes/ordersRoutes');

// Utilisation des routes pour chaque entité
app.use('/api/users', usersRoutes);
// app.use('/api/paniers', panierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoriesRoutes);
// app.use('/api/tabproducts', tabProductsRoutes);
app.use('/api', searchRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/generatedImages', generatedImagesRoutes);

const server = http.createServer(app);

server.keepAliveTimeout = 60000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
