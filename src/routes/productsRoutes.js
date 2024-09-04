const express = require('express');
const createProduct = require('../controllers/products/createProduct');
const updateProduct = require('../controllers/products/updateProduct');
const deleteProduct = require('../controllers/products/deleteProduct');
const getProductById = require('../controllers/products/getProductById');
const getAllProducts = require('../controllers/products/getAllProducts');

const router = express.Router();

// Routes
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
