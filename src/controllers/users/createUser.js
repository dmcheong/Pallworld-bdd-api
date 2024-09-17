const User = require('../../models/userModel');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, country, city, address, codePostal, credits, googleId } = req.body || {};

    let user;

    // Si l'ID Google est fourni, chercher l'utilisateur par cet ID
    if (googleId) {
      user = await User.findOne({ googleId });

      if (!user) {
        // Si l'utilisateur n'existe pas, créer un nouvel utilisateur avec les informations fournies par Google
        user = new User({
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          email,
          googleId,
          isVerified: true // Les utilisateurs Google sont automatiquement vérifiés
        });

        user = await user.save();
        return res.status(201).json(user);
      } else {
        // Si l'utilisateur existe déjà, retourner ses informations
        return res.status(200).json(user);
      }
    } else {
      // Logique existante pour créer un utilisateur avec un mot de passe
      const fullName = (firstName !== undefined && lastName !== undefined) ? `${firstName} ${lastName}` : undefined;

      const newUser = new User({
        firstName,
        lastName,
        fullName,
        email,
        password,
        phone,
        country,
        city,
        address,
        codePostal,
        credits
      });

      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

module.exports = createUser;
