const User = require('../../models/userModel');

const createUser = async (req, res) => {
  try {
    // Affiche les données du formulaire
    console.log(req.body);

    // Récupérer les données du corps de la requête
    const { firstName, lastName, email, password, phone, country, city, address, codePostal, credits } = req.body || {};

    // Concaténer le prénom et le nom de famille pour former le fullname
    const fullName = (firstName !== undefined && lastName !== undefined) ? `${firstName} ${lastName}` : undefined;

    console.log('Les données récupérées du corps de la requête :', req.body);
    console.log('Le fullname formé :', fullName);

    // Créer un nouvel utilisateur avec tous les champs
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

    // Sauvegarder le nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();

    console.log('L\'utilisateur sauvegardé :', savedUser);

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

module.exports = createUser;
