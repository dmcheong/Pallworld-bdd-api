const express = require('express');
const Categorie = require('../models/categorieModel');
const createCategories = require('../controllers/categories/createCategorie');
const updateCategories = require('../controllers/categories/updateCategorie');
const deleteCategories = require('../controllers/categories/deleteCategorie');
const getCategoriesById = require('../controllers/categories/getCategorieById');
const getAllCategories = require('../controllers/categories/getAllCategories');
// const metricsMiddleware = require('../middlewares/metricsMiddleware');

const router = express.Router();

// Utiliser le middleware pour toutes les routes de ce routeur
// router.use(metricsMiddleware);

// Routes
router.post('/', createCategories);
router.get('/', getAllCategories);

// Route pour compter le nombre de catégories
router.get('/count', async (req, res) => {
    try {
        const count = await Categorie.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Erreur lors du comptage des catégories:', error);
        res.status(500).json({ message: 'Erreur lors du comptage des catégories' });
    }
});

router.get('/:id', getCategoriesById);
router.put('/:id', updateCategories);
router.delete('/:id', deleteCategories);

module.exports = router;
