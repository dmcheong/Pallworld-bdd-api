const express = require('express');
const router = express.Router();
const client = require('prom-client');  // Importer 'prom-client' pour gérer les métriques

// Endpoint pour exposer les métriques
router.get('/metrics', async (req, res) => {
  console.log('Route /metrics atteinte');  // Log pour vérifier si la route est atteinte
  try {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    console.log('Métriques envoyées');
    res.end(metrics);
  } catch (err) {
    console.error('Erreur lors de l\'exposition des métriques:', err);
    res.status(500).send('Erreur lors de l\'exposition des métriques');
  }
});
  
module.exports = router;
