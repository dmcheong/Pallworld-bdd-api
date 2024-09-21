const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const axios = require('axios');

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Générer un jeton de réinitialisation de mot de passe
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envoyer l'email de réinitialisation
    const resetLink = `http://localhost:${process.env.PORT_FRONT}/reset-password?token=${resetToken}`;
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Réinitialisation du mot de passe</h2>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour le faire :</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Réinitialiser mon mot de passe</a>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      </div>
    `;

    await axios.post(`http://localhost:${process.env.PORT_NOTIFICATIONS}/sendEmail`, {
      destinataire: user.email,
      sujet: 'Réinitialisation du mot de passe',
      contenu: emailContent,
    });

    res.status(200).json({ message: 'Un email de réinitialisation a été envoyé.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la demande de réinitialisation de mot de passe." });
  }
};

module.exports = { forgotPassword };
