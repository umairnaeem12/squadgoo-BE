import 'reflect-metadata';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import PostgresDataSource from './data-source';
import AppRouter from './routes';
import errHandlingMiddleware from './middlewares/error.middleware';

dotenv.config();

const PORT = process.env.PORT || 6543;
const app = express();
const server = http.createServer(app);

// CORS + Body Parsers
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Endpoints
app.get('/', (_, res) => res.status(200).send('OK'));
app.get('/health', (_, res) => res.status(200).send('OK'));
app.get('/healthcheck', (_, res) => res.status(200).send('OK'));

// API Routes
app.use('/api/app', AppRouter);

// Global Error Middleware (always last)
app.use(errHandlingMiddleware);

// Initialize Database, then Start Server
PostgresDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Graceful Shutdown
const gracefulShutdown = async () => {
  console.log('\n Shutting down server...');
  if (PostgresDataSource.isInitialized) {
    await PostgresDataSource.destroy();
    console.log('🗃️ Database connection closed.');
  }
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Global Error Safety
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
