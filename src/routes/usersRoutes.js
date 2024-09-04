const express = require('express');
const createUser = require('../controllers/users/createUser');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');
const getUserById = require('../controllers/users/getUserById');
const getAllUsers = require('../controllers/users/getAllUsers');

const { signInUser } = require('../controllers/users/signInUser');
const { signUpUser } = require('../controllers/users/signUpUser');

const router = express.Router();

// Routes pour les utilisateurs
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Routes pour l'authentification (sign in et sign up)
router.post('/signin', signInUser);
router.post('/signup', signUpUser);

module.exports = router;
