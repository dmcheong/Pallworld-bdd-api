const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const createProduct = async (req, res) => {
  try {
    const { name, description, characteristics, price, discountPrice, isPromo, quantity, category, images, colors, sizes, customizationOptions } = req.body;

    const existingCategories = await Categorie.find({ _id: { $in: category } });
    if (existingCategories.length !== category.length) {
      return res.status(400).json({ error: 'Certaines catégories n\'existent pas.' });
    }

    const newProduct = new Product({
      name,
      description,
      characteristics,
      price,
      discountPrice,
      isPromo,
      quantity,
      category,
      images,
      colors,
      sizes,
      customizationOptions
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du produit.' });
  }
};

module.exports = createProduct;
