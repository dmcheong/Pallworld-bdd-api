const express = require('express');
const Products = require('../models/productsModel');
const { getAvailableSizes } = require('../controllers/products/getAvailableSizes');
const { getAvailableColors } = require('../controllers/products/getAvailableColors');
const createProduct = require('../controllers/products/createProduct');
const updateProduct = require('../controllers/products/updateProduct');
const deleteProduct = require('../controllers/products/deleteProduct');
const getProductById = require('../controllers/products/getProductById');
const getAllProducts = require('../controllers/products/getAllProducts');
// const metricsMiddleware = require('../middlewares/metricsMiddleware');

const router = express.Router();

// Utiliser le middleware pour toutes les routes de ce routeur
// router.use(metricsMiddleware);

// Route pour récupérer les produits en promotion
router.get('/promos', async (req, res) => {
    try {
      console.log("Récupération des produits en promotion...");
      const promoProducts = await Products.find({ isPromo: true });
      console.log("Produits récupérés :", promoProducts);
      
      res.json({ products: promoProducts });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits en promotion:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des produits en promotion.', error: error.message });
    }
  });
   

// Routes pour récupérer les tailles et les couleurs disponibles
router.get('/sizes', getAvailableSizes);
router.get('/colors', getAvailableColors); 

// Routes pour les produits
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById); 
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
