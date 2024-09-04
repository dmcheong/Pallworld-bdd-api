const Panier = require('../../models/panierModel');

const updatePanier = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPanier = await Panier.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPanier) {
      return res.status(404).json({ error: 'Panier non trouvé.' });
    }

    res.status(200).json(updatedPanier);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du panier.' });
  }
};

module.exports = updatePanier;
