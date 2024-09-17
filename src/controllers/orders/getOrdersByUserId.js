const Order = require('../../models/orderModel');

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate({
        path: 'items.productId',
        select: 'name colors sizes customizationOptions'
      })
      .sort({ createdAt: -1 }) 
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
  }
};

module.exports = getOrdersByUserId;
