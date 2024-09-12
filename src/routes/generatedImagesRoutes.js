const express = require('express');
const createGeneratedImage = require('../controllers/generatedImages/createGeneratedImage');
const getGeneratedImagesByUserId = require('../controllers/generatedImages/getGeneratedImagesByUserId');

const router = express.Router();

router.post('/', createGeneratedImage);
router.get('/:userId', getGeneratedImagesByUserId);

module.exports = router;
