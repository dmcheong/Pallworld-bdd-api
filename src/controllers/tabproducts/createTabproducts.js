const Tabproducts = require('../../models/tabProductsModel');
const Products = require('../../models/productsModel');

const createTabProduct = async (req, res) => {
  try {
    const { productId, quantity, color, size, customization } = req.body;

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    const newTabProduct = new Tabproducts({
      productId: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      color: color || product.colors[0],
      size: size || product.sizes[0], 
      customization: {
        position: customization.position,
        customizationSize: customization.customizationSize,
      },
      quantity,
    });

    const savedTabProduct = await newTabProduct.save();

    res.status(201).json(savedTabProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du produit dans le panier.' });
  }
};

module.exports = createTabProduct;
