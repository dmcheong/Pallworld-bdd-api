const Panier = require('../../models/panierModel');

const getAllPaniers = async (req, res) => {
  try {
    const paniers = await Panier.getAll();
    res.status(200).json(paniers);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paniers.' });
  }
};

module.exports = getAllPaniers;
