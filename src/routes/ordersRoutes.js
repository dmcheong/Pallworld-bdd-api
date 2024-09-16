const express = require('express');
const createOrder = require('../controllers/orders/createOrder');
const getOrdersByUserId = require('../controllers/orders/getOrdersByUserId');
const getAllOrders = require('../controllers/orders/getAllOrders');

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getOrdersByUserId);
router.get('/', getAllOrders);

module.exports = router;
