const express = require('express');
const Users = require('../models/userModel');
const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');
const getUserById = require('../controllers/users/getUserById');
const getAllUsers = require('../controllers/users/getAllUsers');

const { verifyUser } = require('../controllers/users/verifyUser');

const { signInUser } = require('../controllers/users/signInUser');
const { signUpUser } = require('../controllers/users/signUpUser');

const router = express.Router();

// Routes pour les utilisateurs
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.put('/:id/password', async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await Users.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Hachage du nouveau mot de passe
      user.password = newPassword;
      user.markModified('password');  // Force la reconnaissance de la modification du mot de passe
      await user.save();

      res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe.' });
    }
});

router.post('/verify', verifyUser);

// Routes pour l'authentification (sign in et sign up)
router.post('/signin', signInUser);
router.post('/signup', signUpUser);

module.exports = router;
