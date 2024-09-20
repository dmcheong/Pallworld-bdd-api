const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const axios = require('axios');

const signUpUser = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = new User(userData);

    const verificationToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    newUser.verificationToken = verificationToken;

    await newUser.save();

    const verificationLink = `http://localhost:3001/verifier-mon-compte?token=${verificationToken}`;
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Bienvenue chez Pallworld !</h2>
        <p>Merci de vous être inscrit. Pour compléter votre inscription, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Vérifier mon adresse e-mail</a>
        <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.</p>
      </div>
    `;

    const notificationPayload = {
      destinataire: newUser.email,
      sujet: 'Vérifiez votre adresse e-mail',
      contenu: emailContent,
    };

    await axios.post('http://localhost:3011/sendEmail', notificationPayload);

    res.status(201).json({ message: "Utilisateur enregistré avec succès. Veuillez vérifier votre e-mail." });
  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée." });
    }

    res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
  }
};

module.exports = { signUpUser };
