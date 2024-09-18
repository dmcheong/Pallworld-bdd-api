const express = require('express');
const router = express.Router();
const Products = require('../models/productsModel');

router.get('/search', async (req, res) => {
  const query = req.query.query;
  const { color, size, minPrice, maxPrice } = req.query;

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Veuillez entrer au moins 2 caractères pour effectuer une recherche.' });
  }

  try {
    let searchQuery = { name: { $regex: query, $options: 'i' } };
    
    if (color) {
      searchQuery.colors = { $regex: new RegExp(`^${color}$`, 'i') };
    }

    if (size) {
      searchQuery.sizes = size; 
    }

    if (minPrice && maxPrice) {
      searchQuery.price = { $gte: minPrice, $lte: maxPrice }; 
    }

    const products = await Products.find(searchQuery);
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la recherche des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit.' });
  }
});



module.exports = router;
