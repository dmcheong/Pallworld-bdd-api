const User = require('../../models/userModel');

const addTokens = async (req, res) => {
  const { id } = req.params; 
  const { tokensToAdd } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    user.credits = (user.credits || 0) + tokensToAdd; 

    user = await user.save();

    res.status(200).json({ message: 'Tokens ajoutés avec succès', credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout des tokens.' });
  }
};

module.exports = addTokens;
