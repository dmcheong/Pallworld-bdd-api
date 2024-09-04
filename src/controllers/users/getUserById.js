const User = require('../../models/userModel');

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.getById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};

module.exports = getUserById;
