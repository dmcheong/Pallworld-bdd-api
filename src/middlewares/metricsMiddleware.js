// // middlewares/metricsMiddleware.js

// const client = require('prom-client');

// // Création d'un registre global pour les métriques
// const register = new client.Registry();

// // Collecte des métriques par défaut (CPU, mémoire, etc.)
// client.collectDefaultMetrics({ register });

// // Définition d'un compteur pour le nombre de requêtes par endpoint
// const requestCounter = new client.Counter({
//   name: 'api_requests_total',
//   help: 'Nombre total de requêtes reçues par endpoint',
//   labelNames: ['method', 'endpoint', 'statusCode'],
//   registers: [register],
// });

// // Définition d'un histogramme pour le temps de réponse des requêtes
// const responseTimeHistogram = new client.Histogram({
//   name: 'api_response_time_seconds',
//   help: 'Temps de réponse des requêtes en secondes par endpoint',
//   labelNames: ['method', 'endpoint', 'statusCode'],
//   buckets: [0.1, 0.5, 1, 2, 5], // Vous pouvez ajuster les buckets selon vos besoins
//   registers: [register],
// });

// // Middleware pour collecter les métriques
// function metricsMiddleware(req, res, next) {
//   const startEpoch = Date.now();
//   const method = req.method;
//   const endpoint = req.baseUrl + (req.route ? req.route.path : '');

//   res.on('finish', () => {
//     const responseTimeInSeconds = (Date.now() - startEpoch) / 1000;
//     const statusCode = res.statusCode.toString();
//     const labels = { method, endpoint, statusCode };

//     // Incrémenter le compteur de requêtes
//     requestCounter.labels(labels).inc();

//     // Observer le temps de réponse
//     responseTimeHistogram.labels(labels).observe(responseTimeInSeconds);
//   });

//   next();
// }

// // Fonction pour exposer les métriques
// function exposeMetrics(req, res) {
//   res.setHeader('Content-Type', register.contentType);
//   register.metrics().then((metrics) => {
//     res.end(metrics);
//   }).catch((err) => {
//     res.status(500).end(err);
//   });
// }

// module.exports = {
//   metricsMiddleware,
//   exposeMetrics,
// };
