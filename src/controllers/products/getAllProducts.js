const Product = require('../../models/productsModel');
const Categorie = require('../../models/categorieModel');
const { mongoRequestDuration, mongoErrorsTotal } = require('../../metrics'); // Importer les métriques

const getAllProducts = async (req, res) => {
  // Démarre le timer pour la durée de la requête MongoDB
  const end = mongoRequestDuration.startTimer({ operation: 'getAllProducts' });

  try {
    const { category, color, size, minPrice, maxPrice, page = 1, limit = 8 } = req.query;
    let query = {};

    if (category) {
      const foundCategory = await Categorie.findOne({ name: new RegExp(`^${category}$`, 'i') });
      if (!foundCategory) {
        return res.status(404).json({ error: 'Catégorie non trouvée.' });
      }
      query.category = foundCategory._id;
    }

    if (color) {
      query.colors = color;
    }

    if (size) {
      query.sizes = size;
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: minPrice };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: maxPrice };
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('category');

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    // Incrémenter le compteur en cas d'erreur
    mongoErrorsTotal.inc({ operation: 'getAllProducts' });
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
  } finally {
    // Arrêter le timer une fois la requête terminée
    end();
  }
};

module.exports = getAllProducts;
