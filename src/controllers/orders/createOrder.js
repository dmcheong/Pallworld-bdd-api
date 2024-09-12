const Order = require('../../models/orderModel');

const createOrder = async (req, res) => {
  const { userId, items, totalAmount, shippingAddress, imageGenerated } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      imageGenerated,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
  }
};

module.exports = createOrder;
