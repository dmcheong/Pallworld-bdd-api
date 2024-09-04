const Panier = require('../../models/panierModel');

const deletePanier = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPanier = await Panier.findByIdAndDelete(id);

    if (!deletedPanier) {
      return res.status(404).json({ error: 'Panier non trouvé.' });
    }

    res.status(200).json(deletedPanier);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du panier.' });
  }
};

module.exports = deletePanier;
