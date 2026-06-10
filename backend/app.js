import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRoutes from './routes/userRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send('Backend is running');
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
  const endTimer = httpRequestDurationMicroseconds.startTimer();

  res.on('finish', () => {
    const route = req.route ? req.route.path : req.path;

    httpRequestCounter.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });

    endTimer({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });
  });

  next();
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((err, req, res, _next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
