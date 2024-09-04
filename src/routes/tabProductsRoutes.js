const express = require('express');
const createTabproducts = require('../controllers/tabproducts/createTabproducts');
const updateTabproducts = require('../controllers/tabproducts/updateTabproducts');
const deleteTabproducts = require('../controllers/tabproducts/deleteTabproducts');
const getTabproductsById = require('../controllers/tabproducts/getTabproductsById');
const getAllTabproducts = require('../controllers/tabproducts/getAllTabproducts');

const router = express.Router();

// Routes
router.post('/', createTabproducts);
router.get('/', getAllTabproducts);
router.get('/:id', getTabproductsById);
router.put('/:id', updateTabproducts);
router.delete('/:id', deleteTabproducts);

module.exports = router;
