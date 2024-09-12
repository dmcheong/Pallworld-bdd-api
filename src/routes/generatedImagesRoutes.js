const express = require('express');
const createGeneratedImage = require('../controllers/generatedImages/createGeneratedImage');
const getGeneratedImagesByUserId = require('../controllers/generatedImages/getGeneratedImagesByUserId');
const deleteGeneratedImage = require('../controllers/generatedImages/deleteGeneratedImage');

const router = express.Router();

router.post('/', createGeneratedImage);
router.get('/:userId', getGeneratedImagesByUserId);
router.delete('/:imageId', deleteGeneratedImage);

module.exports = router;
