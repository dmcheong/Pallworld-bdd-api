const Order = require('../../models/orderModel');
const Products = require('../../models/productsModel');

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate({
        path: 'items.productId',
        select: 'name colors sizes customizationOptions'
      })
      .sort({ date: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
  }
};

module.exports = getOrdersByUserId;
