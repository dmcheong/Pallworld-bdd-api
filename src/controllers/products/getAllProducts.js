const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Catégorie reçue:', category); // Log pour vérifier la catégorie reçue
    let products;

    if (category) {
      // Trouver l'ID de la catégorie par son nom, insensible à la casse
      const foundCategory = await Categorie.findOne({ name: new RegExp(`^${category}$`, 'i') });
      if (!foundCategory) {
        console.log('Catégorie non trouvée:', category); // Log si la catégorie n'est pas trouvée
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }

      // Filtrer les produits par l'ID de la catégorie trouvée
      products = await Product.find({ category: foundCategory._id }).populate('category');
      console.log('Produits trouvés:', products); // Log des produits trouvés
    } else {
      // Sinon, retourner tous les produits
      products = await Product.getAll();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
  }
};

module.exports = getAllProducts;
