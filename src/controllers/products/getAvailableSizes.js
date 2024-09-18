const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');

const getAvailableSizes = async (req, res) => {
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
    
    const sizes = await Product.distinct('sizes', query);
    res.status(200).json({ sizes });
  } catch (error) {
    console.error('Erreur lors de la récupération des tailles:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des tailles.' });
  }
};

module.exports = { getAvailableSizes };
