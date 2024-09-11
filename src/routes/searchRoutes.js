const express = require('express');
const router = express.Router();
const Products = require('../models/productsModel');

router.get('/search', async (req, res) => {
  const query = req.query.query;

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Veuillez entrer au moins 2 caractères pour effectuer une recherche.' });
  }

  try {
    const products = await Products.find({ 
      name: { $regex: query, $options: 'i' } 
    });
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la recherche des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit.' });
  }
});

module.exports = router;
