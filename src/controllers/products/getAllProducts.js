const Product = require('../../models/productsModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
  }
};

module.exports = getAllProducts;
