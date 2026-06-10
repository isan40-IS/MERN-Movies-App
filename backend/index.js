import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import client from 'prom-client';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

client.collectDefaultMetrics({
  register: client.register,
});

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total jumlah HTTP request',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durasi HTTP request dalam detik',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Rentang waktu respons (detik)
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
