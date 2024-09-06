const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { verifyPasswordMiddleware } = require('../../middlewares/hashPassword');

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher l'utilisateur dans la base de données par son adresse e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    // Vérifier si le compte est vérifié
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Veuillez vérifier votre email avant de vous connecter.' });
    }

    // Utiliser le middleware pour vérifier le mot de passe
    const isValidPassword = await verifyPasswordMiddleware(password, user);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    // Si le mot de passe est correct, générer un token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    // Si le mot de passe est correct, vous pouvez répondre avec succès
    return res.status(200).json({ message: "Connexion réussie !", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
  }
};

module.exports = { signInUser };
