const express = require('express');
const createPanier = require('../controllers/paniers/createPanier');
const updatePanier = require('../controllers/paniers/updatePanier');
const deletePanier = require('../controllers/paniers/deletePanier');
const getPanierById = require('../controllers/paniers/getPanierById');
const getAllPaniers = require('../controllers/paniers/getAllPaniers');

const router = express.Router();

// Routes
router.post('/', createPanier);
router.get('/', getAllPaniers);
router.get('/:id', getPanierById);
router.put('/:id', updatePanier);
router.delete('/:id', deletePanier);

module.exports = router;
