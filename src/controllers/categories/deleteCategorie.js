const Categorie = require('../../models/categorieModel');

const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedCategorie = await Categorie.findByIdAndDelete(id);
    
    if (!deletedCategorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée.' });
    }
    
    res.status(200).json(deletedCategorie);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie.' });
  }
};

module.exports = deleteCategorie;

