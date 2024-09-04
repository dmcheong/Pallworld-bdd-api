const scrypt = require('scrypt-kdf');

// Middleware pre-save pour hacher le mot de passe avant la sauvegarde
const hashPasswordMiddleware = async function (next) {
  const user = this;

  // Vérifier si le mot de passe a été modifié
  if (!user.isModified('password')) {
    console.log('Le mot de passe n\'a pas été modifié. Passage à l\'étape suivante.');
    return next(); // Si non, passer à l'étape suivante
  }

  try {
    // Hacher le mot de passe en utilisant scrypt
    const hashedPassword = await scrypt.kdf(user.password, { logN: 15 }); // logN peut être ajusté pour plus de sécurité
    user.password = hashedPassword.toString('base64'); // Convertir le Buffer en chaîne pour le stockage
    console.log('Le mot de passe a été haché avec succès.');

    next(); // Passer à l'étape suivante
  } catch (error) {
    console.error('Une erreur est survenue lors du hachage du mot de passe :', error);
    return next(error); // En cas d'erreur, passer l'erreur au middleware suivant
  }
};

// Middleware pour vérifier le mot de passe
const verifyPasswordMiddleware = async function (password, user) {
  try {
    // Vérifier le mot de passe en utilisant scrypt
    const isValidPassword = await scrypt.verify(Buffer.from(user.password, 'base64'), password);
    if (!isValidPassword) {
      console.log('Mot de passe incorrect.');
      return false;
    }

    console.log('Mot de passe correct.');
    return true;
  } catch (error) {
    console.error('Une erreur est survenue lors de la vérification du mot de passe :', error);
    return false;
  }
};

module.exports = { hashPasswordMiddleware, verifyPasswordMiddleware };
