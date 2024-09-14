const Order = require('../../models/orderModel');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
    } = req.body;

    console.log('Données de commande reçues:', req.body);

    if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({ error: 'Certaines informations obligatoires sont manquantes.' });
    }

    const order = new Order({
      userId,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
        customizationOptions: item.customizationOptions,
      })),
      totalAmount,
      shippingAddress,
    });

    await order.save();

    console.log('Commande créée avec succès:', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Erreur lors de la création de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
  }
};

module.exports = createOrder;
