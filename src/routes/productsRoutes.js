const express = require('express');
const { getAvailableSizes } = require('../controllers/products/getAvailableSizes');
const { getAvailableColors } = require('../controllers/products/getAvailableColors');
const createProduct = require('../controllers/products/createProduct');
const updateProduct = require('../controllers/products/updateProduct');
const deleteProduct = require('../controllers/products/deleteProduct');
const getProductById = require('../controllers/products/getProductById');
const getAllProducts = require('../controllers/products/getAllProducts');
const metricsMiddleware = require('../middlewares/metricsMiddleware');

const router = express.Router();

// Utiliser le middleware pour toutes les routes de ce routeur
router.use(metricsMiddleware);

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
