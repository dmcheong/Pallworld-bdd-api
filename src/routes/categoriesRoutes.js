const express = require('express');
const createCategories = require('../controllers/categories/createCategorie');
const updateCategories = require('../controllers/categories/updateCategorie');
const deleteCategories = require('../controllers/categories/deleteCategorie');
const getCategoriesById = require('../controllers/categories/getCategorieById');
const getAllCategories = require('../controllers/categories/getAllCategories');
const metricsMiddleware = require('../middlewares/metricsMiddleware');

const router = express.Router();

// Utiliser le middleware pour toutes les routes de ce routeur
router.use(metricsMiddleware);

// Routes
router.post('/', createCategories);
router.get('/', getAllCategories);
router.get('/:id', getCategoriesById);
router.put('/:id', updateCategories);
router.delete('/:id', deleteCategories);

module.exports = router;
