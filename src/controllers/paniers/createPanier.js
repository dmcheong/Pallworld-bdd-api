const Panier = require('../../models/panierModel');

const createPanier = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { totalPrice, totalQuantity, tabProducts } = req.body;

    // Créer un nouveau panier avec les données fournies
    const newPanier = new Panier({
      totalPrice,
      totalQuantity,
      tabProducts,
    });

    // Enregistrer le nouveau panier dans la base de données
    const savedPanier = await newPanier.save();

    // Répondre avec le panier enregistré
    res.status(201).json(savedPanier);
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    res.status(500).json({ error: 'Erreur lors de la création du panier.' });
  }
};

module.exports = createPanier;
