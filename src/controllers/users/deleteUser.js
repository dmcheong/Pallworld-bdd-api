const User = require('../../models/userModel');

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

module.exports = deleteUser;
