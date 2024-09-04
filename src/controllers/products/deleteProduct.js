const Product = require('../../models/productsModel');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }
    
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du produit.' });
  }
};

module.exports = deleteProduct;
