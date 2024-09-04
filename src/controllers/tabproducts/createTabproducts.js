const Tabproducts = require('../../models/tabProductsModel');

const createTabProduct = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { productId, quantity, price } = req.body;

    // Vérifier si l'ID du produit est fourni
    if (!productId) {
      return res.status(400).json({ error: 'L\'ID du produit est requis.' });
    }

    // Créer un nouveau tabProduct avec les données fournies
    const newTabProduct = new Tabproducts({
      productId,
      quantity,
      price,
    });

    // Sauvegarder le nouveau tabProduct dans la base de données
    const savedTabProduct = await newTabProduct.save();

    res.status(201).json(savedTabProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du tabProduct.' });
  }
};

module.exports = createTabProduct;
