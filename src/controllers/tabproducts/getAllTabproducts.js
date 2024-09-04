const Tabproducts = require('../../models/tabProductsModel');

const getAllTabproducts = async (req, res) => {
  try {
    const tabproducts = await Tabproducts.find().populate('productId');
    res.status(200).json(tabproducts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tableaux de produits.' });
  }
};

module.exports = getAllTabproducts;
