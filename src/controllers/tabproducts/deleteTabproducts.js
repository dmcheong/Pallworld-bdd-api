const Tabproducts = require('../../models/tabProductsModel');

const deleteTabproducts = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedTabproducts = await Tabproducts.findByIdAndDelete(id);
    
    if (!deletedTabproducts) {
      return res.status(404).json({ error: 'Tableau de produits non trouvé.' });
    }
    
    res.status(200).json(deletedTabproducts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du tableau de produits.' });
  }
};

module.exports = deleteTabproducts;
