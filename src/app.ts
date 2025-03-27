import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { createRouter } from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', createRouter());

// Start server
const startServer = () => {
  const port = config.port;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();

export default app;