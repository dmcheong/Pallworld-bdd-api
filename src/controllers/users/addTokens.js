const User = require('../../models/userModel');

const addTokens = async (req, res) => {
  const { id } = req.params; // Récupère l'ID de l'utilisateur depuis les paramètres
  const { tokensToAdd } = req.body; // Récupère le nombre de tokens à ajouter depuis le corps de la requête

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    user.credits = (user.credits || 0) + tokensToAdd; // Ajoute les tokens

    user = await user.save(); // Sauvegarde les changements dans la base de données

    res.status(200).json({ message: 'Tokens ajoutés avec succès', credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout des tokens.' });
  }
};

module.exports = addTokens;
