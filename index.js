const express = require('express');
const http = require('http');


const app = express();
const dotenv = require('dotenv');

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

dotenv.config();
const port = process.env.PORT;

const mongoose = require('./src/config/mongodb-config');

const bodyParser = require('body-parser');
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

// Utilisation des routes pour chaque entité
app.use('/api/users', usersRoutes);
app.use('/api/paniers', panierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api/tabproducts', tabProductsRoutes);
app.use('/api', searchRoutes); 

const server = http.createServer(app);

server.keepAliveTimeout = 60000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
