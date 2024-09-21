const express = require('express');
const router = express.Router();
const Products = require('../models/productsModel');
const Order = require('../models/orderModel');

router.get('/search', async (req, res) => {
  const query = req.query.query;
  const { color, size, minPrice, maxPrice } = req.query;

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Veuillez entrer au moins 2 caractères pour effectuer une recherche.' });
  }

  try {

    // Recherche de commande par ID
    if (query.length === 8) {
      const orders = await Order.find({}); 
      const filteredOrder = orders.find(order => order._id.toString().startsWith(query));
      
      if (filteredOrder) {
        return res.json(filteredOrder);
      } else {
        return res.status(404).json({ error: 'Commande non trouvée.' });
      }
    }

    // Recherche de produits
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
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

module.exports = router;
