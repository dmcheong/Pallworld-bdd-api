const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer les identifiants de catégories depuis le corps de la requête
    const { categories, name, price, quantity, images } = req.body;

    // Vérifier l'existence des catégories
    const existingCategories = await Categorie.find({ _id: { $in: categories } });
    if (existingCategories.length !== categories.length) {
      return res.status(400).json({ error: 'Certaines catégories n\'existent pas.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        categories,
        name,
        price,
        quantity,
        images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit.' });
  }
};

module.exports = updateProduct;