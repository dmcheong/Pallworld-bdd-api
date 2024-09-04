const Product = require('../../models/productsModel');

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.getById(id);

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du produit.' });
  }
};

module.exports = getProductById;
