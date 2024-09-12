const express = require('express');
const Users = require('../models/userModel');
const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');
const getUserById = require('../controllers/users/getUserById');
const getAllUsers = require('../controllers/users/getAllUsers');

const { verifyUser } = require('../controllers/users/verifyUser');

const { forgotPassword } = require('../controllers/users/forgotPassword');
const { resetPassword } = require('../controllers/users/resetPassword'); 

const { signInUser } = require('../controllers/users/signInUser');
const { signUpUser } = require('../controllers/users/signUpUser');

const router = express.Router();

// Routes pour les utilisateurs
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.put('/:id/save-image', updateUser);
router.put('/:id/password', async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await Users.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      user.password = newPassword;
      user.markModified('password');
      await user.save();

      res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe.' });
    }
});
router.delete('/:id', deleteUser);

// Routes pour vérifier l'utilisateur
router.post('/verify', verifyUser);

// Routes pour la réinitialisation de mot de passe
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword); 

// Routes pour l'authentification (sign in et sign up)
router.post('/signin', signInUser);
router.post('/signup', signUpUser);

module.exports = router;
