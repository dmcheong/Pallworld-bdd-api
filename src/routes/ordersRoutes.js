const express = require('express');
const createOrder = require('../controllers/orders/createOrder');
const getOrdersByUserId = require('../controllers/orders/getOrdersByUserId');

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getOrdersByUserId);

module.exports = router;
