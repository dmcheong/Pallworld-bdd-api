const scrypt = require('scrypt-kdf');

const hashPasswordMiddleware = async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    console.log('Le mot de passe n\'a pas été modifié. Passage à l\'étape suivante.');
    return next();
  }

  try {
    const hashedPassword = await scrypt.kdf(user.password, { logN: 15 }); 
    user.password = hashedPassword.toString('base64'); 
    console.log('Le mot de passe a été haché avec succès.');

    next(); 
  } catch (error) {
    console.error('Une erreur est survenue lors du hachage du mot de passe :', error);
    return next(error); 
  }
};

const verifyPasswordMiddleware = async function (password, user) {
  try {
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
