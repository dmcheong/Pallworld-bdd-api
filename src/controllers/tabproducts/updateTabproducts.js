const Tabproducts = require('../../models/tabProductsModel');

const updateTabproducts = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedTabproducts = await Tabproducts.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTabproducts) {
      return res.status(404).json({ error: 'Tableau de produits non trouvé.' });
    }
    
    res.status(200).json(updatedTabproducts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du tableau de produits.' });
  }
};

module.exports = updateTabproducts;
