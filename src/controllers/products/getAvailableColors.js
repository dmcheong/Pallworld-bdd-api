const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const getAvailableColors = async (req, res) => {
  const { category } = req.query; 

  try {
    let query = {};

    if (category) {
      const foundCategory = await Categorie.findOne({ name: new RegExp(`^${category}$`, 'i') });
      if (!foundCategory) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
      query.category = foundCategory._id;
    }

    const colors = await Product.distinct('colors', query);
    res.status(200).json({ colors });
  } catch (error) {
    console.error('Erreur lors de la récupération des couleurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des couleurs.' });
  }
};

module.exports = { getAvailableColors };
