const Categorie = require('../../models/categorieModel');

const getCategorieById = async (req, res) => {
  const { id } = req.params;

  try {
    const categorie = await Categorie.getById(id);

    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée.' });
    }

    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie.' });
  }
};

module.exports = getCategorieById;
