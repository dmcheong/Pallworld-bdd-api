const client = require('prom-client');

// Crée un histogramme pour le temps de réponse des requêtes MongoDB
const mongoRequestDuration = new client.Histogram({
  name: 'api_mongo_request_duration_seconds',
  help: 'Durée des requêtes MongoDB en secondes',
  labelNames: ['operation'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Crée un compteur pour le nombre d'erreurs MongoDB
const mongoErrorsTotal = new client.Counter({
  name: 'api_mongo_errors_total',
  help: 'Nombre total d\'erreurs MongoDB',
  labelNames: ['operation']
});

// Collecte les métriques par défaut
client.collectDefaultMetrics();

console.log('Métriques MongoDB initialisées');

module.exports = {
  mongoRequestDuration,
  mongoErrorsTotal,
};
