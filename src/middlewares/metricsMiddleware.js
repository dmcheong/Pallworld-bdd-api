const client = require('prom-client');

const requestCounter = new client.Counter({
  name: 'api_requests_total',
  help: 'Nombre total de requêtes reçues par endpoint',
  labelNames: ['method', 'endpoint', 'statusCode'],
});

const responseTimeHistogram = new client.Histogram({
  name: 'api_response_time_seconds',
  help: 'Temps de réponse des requêtes en secondes par endpoint',
  labelNames: ['method', 'endpoint', 'statusCode'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

function metricsMiddleware(req, res, next) {
  const end = responseTimeHistogram.startTimer();
  const method = req.method;
  const endpoint = req.baseUrl + req.path;

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const labels = { method, endpoint, statusCode };

    requestCounter.labels(method, endpoint, statusCode).inc();
    end(labels);
  });

  next();
}

module.exports = metricsMiddleware;
