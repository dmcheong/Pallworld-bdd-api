const express = require('express');
const router = express.Router();
const Products = require('../models/productsModel'); // Assure-toi que le chemin est correct

// Route de recherche
router.get('/search', async (req, res) => {
  const query = req.query.query;

  // Vérifie si la longueur de la requête est inférieure à 2 caractères
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Veuillez entrer au moins 2 caractères pour effectuer une recherche.' });
  }

  try {
    // Recherche par nom de produit 
    const products = await Products.find({ 
      name: { $regex: query, $options: 'i' } // Recherche insensible à la casse
    });
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la recherche des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit.' });
  }
});

module.exports = router;
