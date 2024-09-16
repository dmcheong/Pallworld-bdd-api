const Order = require('../../models/orderModel');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'userId',
        select: 'firstName lastName email'
      })
      .populate({
        path: 'items.productId',
        select: 'name colors sizes customizationOptions'
      })
      .sort({ date: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de toutes les commandes.' });
  }
};

module.exports = getAllOrders;
