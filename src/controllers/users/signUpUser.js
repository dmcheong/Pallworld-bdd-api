const User = require('../../models/userModel');

const signUpUser = async (req, res) => {
  const userData = req.body;

  try {
    // Créer un nouvel utilisateur avec les données fournies
    const newUser = new User(userData);

    // Enregistrer le nouvel utilisateur dans la base de données
    await newUser.save();

    // Répondre avec un statut 201 (créé) si l'inscription réussit
    res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
  } catch (error) {
    console.error(error);

    // Vérifier si l'erreur est due à un e-mail déjà existant
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée." });
    }

    // Si une autre erreur se produit, répondre avec un statut 500 (erreur serveur)
    res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
  }
};

module.exports = { signUpUser };
