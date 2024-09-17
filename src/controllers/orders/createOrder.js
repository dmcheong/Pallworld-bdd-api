const Order = require('../../models/orderModel');
const User = require('../../models/userModel');

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;

    console.log('Items received:', items);

    if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({ error: 'Certaines informations obligatoires sont manquantes.' });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Modifier la condition pour détecter les commandes de tokens
    const isTokenPurchase = items.some(item => item.name && item.name.toLowerCase().includes('token'));
    if (isTokenPurchase) {
      const order = new Order({
        userId,
        items: items.map(item => ({
          productId: null,  // Pas de produit associé
          quantity: item.quantity,
          price: item.price,
          isTokenPurchase: true,  // Défini sur true pour une commande de tokens
          tokensQuantity: item.quantity,
        })),
        totalAmount,
        shippingAddress,
      });
    
      console.log('Order created (tokens):', order);  // Vérifiez ici que les tokens sont correctement traités
      await order.save();
      return res.status(201).json(order);
    }

    // Si c'est une commande de produits classiques
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
        isTokenPurchase: false,
        tokensQuantity: 0,
      })),
      totalAmount,
      shippingAddress,
    });

    console.log('Order created (products):', order); // Ajoutez cette ligne pour voir ce qui est enregistré
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
  }
};

module.exports = createOrder;
