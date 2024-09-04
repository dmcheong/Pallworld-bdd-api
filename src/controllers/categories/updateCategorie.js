const Categorie = require('../../models/categorieModel');

const updateCategorie = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedCategorie = await Categorie.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedCategorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée.' });
    }
    
    res.status(200).json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie.' });
  }
};

module.exports = updateCategorie;
