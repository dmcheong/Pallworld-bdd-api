const Product = require('../../models/productsModel');

const deleteProduct = async (req, res) => {
  const { id } = req.params; // Utilisé pour la suppression d'un seul produit
  const { ids } = req.body; // Utilisé pour la suppression multiple

  try {
    // Si un tableau d'IDs est fourni, on effectue une suppression multiple
    if (ids && Array.isArray(ids)) {
      const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });
      
      if (deletedProducts.deletedCount === 0) {
        return res.status(404).json({ error: 'Aucun produit trouvé pour suppression.' });
      }

      return res.status(200).json({ message: `${deletedProducts.deletedCount} produits supprimés avec succès.` });
    }
    
    // Sinon, on effectue une suppression d'un seul produit
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
