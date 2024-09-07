const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const createProduct = async (req, res) => {
  try {
    // Récupérer les identifiants de catégories depuis le corps de la requête
    const { name, description, characteristics, price, quantity, categories, images } = req.body;

    // Vérifier l'existence des catégories
    const existingCategories = await Categorie.find({ _id: { $in: categories } });
    if (existingCategories.length !== categories.length) {
      return res.status(400).json({ error: 'Certaines catégories n\'existent pas.' });
    }

    const newProduct = new Products({
      name,
      description,
      characteristics,
      price,
      quantity,
      categories,
      images
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du produit.' });
  }
};

module.exports = createProduct;
