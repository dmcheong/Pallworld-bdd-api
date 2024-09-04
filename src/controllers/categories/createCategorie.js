const Categorie = require('../../models/categorieModel');

const createCategorie = async (req, res) => {
  try {
    const newCategorie = new Categorie(req.body);
    const savedCategorie = await newCategorie.save();
    res.status(201).json(savedCategorie);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la catégorie.' });
  }
};

module.exports = createCategorie;

