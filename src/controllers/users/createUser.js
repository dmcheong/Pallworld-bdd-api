const User = require('../../models/userModel');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, country, city, address, codePostal, credits } = req.body || {};

    const fullName = (firstName !== undefined && lastName !== undefined) ? `${firstName} ${lastName}` : undefined;

    console.log('Les données récupérées du corps de la requête :', req.body);
    console.log('Le fullname formé :', fullName);

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

    console.log('Le nouvel utilisateur créé :', newUser);

    const savedUser = await newUser.save();

    console.log('L\'utilisateur sauvegardé :', savedUser);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

module.exports = createUser;
