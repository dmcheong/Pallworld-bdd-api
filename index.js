const express = require('express');
const http = require('http'); // Pour la persistance et éviter des doubles appels

// Initialiser Express
const app = express();
const dotenv = require('dotenv');

 // Autoriser toutes les requêtes cross-origin
const cors = require('cors');
app.use(cors());

// Charger les variables d'environnement
dotenv.config();
const port = process.env.PORT;

// Connexion à la base de données MongoDB
const mongoose = require('./src/config/mongodb-config');

// Middleware pour analyser les requêtes JSON
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

// Utilisation des routes pour chaque entité
app.use('/api/users', usersRoutes);
app.use('/api/paniers', panierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tabproducts', tabProductsRoutes);

const server = http.createServer(app);

// Activez la persistance de la connexion
server.keepAliveTimeout = 60000; // Temps d'attente en millisecondes avant de fermer une connexion inutilisée

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
