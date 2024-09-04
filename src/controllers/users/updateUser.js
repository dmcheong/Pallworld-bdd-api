const User = require('../../models/userModel');

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer les données du corps de la requête
    const { firstName, lastName, email, password, phone, country, city, address, codePostal, credits, historique } = req.body;

    // Vérifier si firstName et lastName sont fournis, si oui, mettre à jour fullName
    const fullName = (firstName !== undefined && lastName !== undefined) ? `${firstName} ${lastName}` : undefined;

    // Récupérer l'utilisateur à mettre à jour
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour les champs de l'utilisateur
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    user.country = country || user.country;
    user.city = city || user.city;
    user.address = address || user.address;
    user.codePostal = codePostal || user.codePostal;
    user.credits = credits || user.credits;
    user.historique = historique || user.historique;

    // Sauvegarder les modifications
    user = await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

module.exports = updateUser;
