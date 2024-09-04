const Panier = require('../../models/panierModel');

const getPanierById = async (req, res) => {
  const { id } = req.params;

  try {
    const panier = await Panier.getById(id);

    if (!panier) {
      return res.status(404).json({ error: 'Panier non trouvé.' });
    }

    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du panier.' });
  }
};

module.exports = getPanierById;
