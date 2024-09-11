const Panier = require('../../models/panierModel');

const createPanier = async (req, res) => {
  try {
    const { totalPrice, totalQuantity, tabProducts } = req.body;

    const newPanier = new Panier({
      totalPrice,
      totalQuantity,
      tabProducts,
    });

    const savedPanier = await newPanier.save();

    res.status(201).json(savedPanier);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du panier.' });
  }
};

module.exports = createPanier;
