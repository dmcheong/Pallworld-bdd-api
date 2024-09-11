const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, description, characteristics, price, quantity, category, images, colors, sizes, customizationOptions } = req.body;

    const existingCategories = await Categorie.find({ _id: { $in: category } });
    if (existingCategories.length !== category.length) {
      return res.status(400).json({ error: 'Certaines catégories n\'existent pas.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        characteristics,
        price,
        quantity,
        category,
        images,
        colors,
        sizes,
        customizationOptions
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit.' });
  }
};

module.exports = updateProduct;
