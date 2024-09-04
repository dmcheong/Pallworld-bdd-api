const Tabproducts = require('../../models/tabProductsModel');

const getTabproductsById = async (req, res) => {
  const { id } = req.params;

  try {
    const tabproducts = await Tabproducts.findById(id);

    if (!tabproducts) {
      return res.status(404).json({ error: 'Tableau de produits non trouvé.' });
    }

    res.status(200).json(tabproducts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du tableau de produits.' });
  }
};

module.exports = getTabproductsById;
