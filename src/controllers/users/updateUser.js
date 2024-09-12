const User = require('../../models/userModel');

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { generatedImage } = req.body;

  try {
    const { firstName, lastName, email, password, phone, country, city, address, codePostal, credits, historique } = req.body;

    const fullName = (firstName !== undefined && lastName !== undefined) ? `${firstName} ${lastName}` : undefined;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    if (generatedImage) {
      user.generatedImages.push(generatedImage);
    }

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

    user = await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

module.exports = updateUser;
