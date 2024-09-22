const Categorie = require('../../models/categorieModel');

const deleteCategorie = async (req, res) => {
  // Vérifier si la suppression est multiple ou non
  if (req.body.ids) {
    // Cas de suppression multiple
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Aucun ID fourni pour la suppression.' });
    }

    try {
      // Supprimer toutes les catégories dont les IDs sont dans le tableau
      const result = await Categorie.deleteMany({ _id: { $in: ids } });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Aucune catégorie supprimée.' });
      }

      return res.status(200).json({ message: `${result.deletedCount} catégorie(s) supprimée(s) avec succès.` });
    } catch (error) {
      console.error('Erreur lors de la suppression de plusieurs catégories:', error);
      return res.status(500).json({ error: 'Erreur lors de la suppression de plusieurs catégories.' });
    }
  } else {
    // Cas de suppression d'une seule catégorie
    const { id } = req.params;

    try {
      const deletedCategorie = await Categorie.findByIdAndDelete(id);

      if (!deletedCategorie) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }

      return res.status(200).json(deletedCategorie);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie.' });
    }
  }
};

module.exports = deleteCategorie;
