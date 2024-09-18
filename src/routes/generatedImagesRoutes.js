const express = require('express');
const createGeneratedImage = require('../controllers/generatedImages/createGeneratedImage');
const getGeneratedImagesByUserId = require('../controllers/generatedImages/getGeneratedImagesByUserId');
const deleteGeneratedImage = require('../controllers/generatedImages/deleteGeneratedImage');
// const metricsMiddleware = require('../middlewares/metricsMiddleware');

const router = express.Router();

// Utiliser le middleware pour toutes les routes de ce routeur
// router.use(metricsMiddleware);

router.post('/', createGeneratedImage);
router.get('/:userId', getGeneratedImagesByUserId);
router.delete('/:imageId', deleteGeneratedImage);

module.exports = router;
