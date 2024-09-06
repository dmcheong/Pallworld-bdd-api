const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const axios = require('axios');

const signUpUser = async (req, res) => {
  const userData = req.body;

  try {
    // Créer un nouvel utilisateur avec les données fournies
    const newUser = new User(userData);

    // Génération du jeton de vérification
    const verificationToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    newUser.verificationToken = verificationToken;

    // Enregistrer le nouvel utilisateur dans la base de données
    await newUser.save();

    // Créer un lien de vérification stylisé
    const verificationLink = `http://localhost:3000/verifier-mon-compte?token=${verificationToken}`;
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Bienvenue chez Pallworld !</h2>
        <p>Merci de vous être inscrit. Pour compléter votre inscription, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Vérifier mon adresse e-mail</a>
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.</p>
      </div>
    `;

    // Prépare la requête pour le service de notifications
    const notificationPayload = {
      destinataire: newUser.email,
      sujet: 'Vérifiez votre adresse e-mail',
      contenu: emailContent, // Utilisation du contenu HTML stylisé
    };

    // Envoie la requête au service de notifications
    await axios.post('http://localhost:3011/sendEmail', notificationPayload);

    // Répondre avec un statut 201 (créé) si l'inscription réussit
    res.status(201).json({ message: "Utilisateur enregistré avec succès. Veuillez vérifier votre e-mail." });
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
