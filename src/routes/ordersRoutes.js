const express = require('express');
const createOrder = require('../controllers/orders/createOrder');
const getOrdersByUserId = require('../controllers/orders/getOrdersByUserId');
const getAllOrders = require('../controllers/orders/getAllOrders');
const Order = require('../models/orderModel');

const router = express.Router();

router.post('/', createOrder);

// Route pour compter le nombre de commandes
router.get('/count', async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Erreur lors du comptage des commandes:', error);
        res.status(500).json({ message: 'Erreur lors du comptage des commandes' });
    }
});


router.get('/:userId', getOrdersByUserId);
router.get('/', getAllOrders);

module.exports = router;
