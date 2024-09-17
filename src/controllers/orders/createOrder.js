const Order = require('../../models/orderModel');
const User = require('../../models/userModel');

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;

    if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({ error: 'Certaines informations obligatoires sont manquantes.' });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérification si c'est une commande de tokens
    const isTokenPurchase = items.some(item => item.name && item.name.toLowerCase().includes('token'));
    if (isTokenPurchase) {
      const order = new Order({
        userId,
        items: items.map(item => ({
          productId: null,
          quantity: item.quantity,
          price: item.price,
          isTokenPurchase: true,
          tokensQuantity: item.quantity,
        })),
        totalAmount,
        shippingAddress,
      });
    
      await order.save();
      return res.status(201).json(order);
    }

    // Pour les commandes de produits, y compris les options de personnalisation et l'image générée
    const tokensRequired = items.reduce((total, item) => total + item.quantity, 0);

    if (user.credits < tokensRequired) {
      return res.status(400).json({ error: 'Nombre de tokens insuffisant pour passer la commande.' });
    }

    user.credits -= tokensRequired;
    await user.save();

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
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
  }
};

module.exports = createOrder;
