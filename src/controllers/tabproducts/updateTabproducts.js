const Tabproducts = require('../../models/tabProductsModel');

const updateTabproducts = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedTabProduct = await Tabproducts.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTabProduct) {
      return res.status(404).json({ error: 'Produit non trouvé dans le panier.' });
    }
    
    res.status(200).json(updatedTabProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit dans le panier.' });
  }
};

module.exports = updateTabproducts;
