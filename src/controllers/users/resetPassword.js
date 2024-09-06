const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { hashPasswordMiddleware } = require('../../middlewares/hashPassword');

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour le mot de passe avec hachage
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe." });
  }
};

module.exports = { resetPassword };
