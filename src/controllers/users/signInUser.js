const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { verifyPasswordMiddleware } = require('../../middlewares/hashPassword');
const Panier = require('../../models/panierModel');

const signInUser = async (req, res) => {
  const { email, password, localCart } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Veuillez vérifier votre email avant de vous connecter.' });
    }

    const isValidPassword = await verifyPasswordMiddleware(password, user);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    // Synchroniser le panier local avec le panier serveur
    if (localCart && localCart.length > 0) {
      let existingCart = await Panier.findOne({ userId: user._id });

      if (!existingCart) {
        existingCart = new Panier({
          userId: user._id,
          tabProducts: localCart,
          totalPrice: localCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          totalQuantity: localCart.reduce((sum, item) => sum + item.quantity, 0),
        });
      } else {
        localCart.forEach((localProduct) => {
          const existingProductIndex = existingCart.tabProducts.findIndex(
            (item) =>
              item.productId === localProduct.productId &&
              item.color === localProduct.color &&
              item.size === localProduct.size &&
              item.customization.position === localProduct.customization.position &&
              item.customization.customizationSize === localProduct.customization.customizationSize
          );

          if (existingProductIndex >= 0) {
            existingCart.tabProducts[existingProductIndex].quantity += localProduct.quantity;
          } else {
            existingCart.tabProducts.push(localProduct);
          }
        });

        existingCart.totalPrice += localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        existingCart.totalQuantity += localCart.reduce((sum, item) => sum + item.quantity, 0);
      }

      await existingCart.save();
    }

    // Inclure l'ID utilisateur dans la réponse
    return res.status(200).json({ 
      message: "Connexion réussie !", 
      token, 
      user: { 
        _id: user._id, 
        email: user.email,
        // Ajoute ici d'autres informations sur l'utilisateur si nécessaire
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
  }
};

module.exports = { signInUser };
