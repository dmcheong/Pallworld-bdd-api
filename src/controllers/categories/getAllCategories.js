const Categorie = require('../../models/categorieModel');

const getAllCategories = async (req, res) => {
  try {
    const category = await Categorie.getAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories.' });
  }
};

module.exports = getAllCategories;
