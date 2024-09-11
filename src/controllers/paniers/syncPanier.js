const Panier = require('../../models/panierModel');

const syncPanier = async (req, res) => {
  const { userId, products } = req.body;

  try {
    let panier = await Panier.findOne({ userId });

    if (!panier) {
      // Créer un nouveau panier si l'utilisateur n'en a pas encore
      panier = new Panier({
        userId,
        tabProducts: products,
        totalPrice: products.reduce((sum, product) => sum + product.price * product.quantity, 0),
        totalQuantity: products.reduce((sum, product) => sum + product.quantity, 0),
      });
    } else {
      // Ajouter les produits au panier existant
      panier.tabProducts.push(...products);
      panier.totalPrice += products.reduce((sum, product) => sum + product.price * product.quantity, 0);
      panier.totalQuantity += products.reduce((sum, product) => sum + product.quantity, 0);
    }

    const savedPanier = await panier.save();
    res.status(200).json(savedPanier);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la synchronisation du panier.' });
  }
};

module.exports = syncPanier;
