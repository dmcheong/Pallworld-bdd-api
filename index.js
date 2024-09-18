const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('prom-client');

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoose = require('./src/config/mongodb-config');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Exposition des métriques via /metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();  // Exposer les métriques collectées
    res.end(metrics);
  } catch (err) {
    console.error('Erreur lors de l\'exposition des métriques:', err);
    res.status(500).send('Erreur lors de l\'exposition des métriques');
  }
});

// Route de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre API Pallworld!');
});

// Import des routes pour chaque entité
const usersRoutes = require('./src/routes/usersRoutes');
const productRoutes = require('./src/routes/productsRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const generatedImagesRoutes = require('./src/routes/generatedImagesRoutes');
// const metricsRoute = require('./src/routes/metricsRoute'); //bug
// Import de la nouvelle route pour les commandes
const ordersRoutes = require('./src/routes/ordersRoutes');
//not use anymore
const panierRoutes = require('./src/routes/panierRoutes');
const tabProductsRoutes = require('./src/routes/tabProductsRoutes');

// Middleware pour tracer les requêtes HTTP
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.originalUrl}`);
  next(); // Passer à la route suivante
});

// Utilisation des routes pour chaque entité
app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api', searchRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/generatedImages', generatedImagesRoutes);
// app.use('/metrics', metricsRoute); //bug

//not use anymore
// app.use('/api/paniers', panierRoutes);
// app.use('/api/tabproducts', tabProductsRoutes);

const server = http.createServer(app);

server.keepAliveTimeout = 60000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
