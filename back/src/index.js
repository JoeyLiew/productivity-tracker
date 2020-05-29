const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();

const initializeMiddlewares = (app) => {
  // Compress response bodies.
  app.use(compression());
  // Set security-related HTTP response headers.
  app.use(helmet());
  // It parses incoming requests with JSON payloads.
  app.use(express.json());
  // It parses incoming requests with urlencoded payloads.
  app.use(express.urlencoded({ extended: true }));
  // Enable cross-origin resource sharing (CORS).
  app.use(cors());
  // HTTP request logger.
  app.use(morgan('dev'));
};

const startServer = (app) => {
  // Load environment variables.
  dotenv.config();
  initializeMiddlewares(app);
  // Initialize api routes.
  app.use('/api', routes);
  // Global error handler.
  app.use(error);
  const port = process.env.PORT;
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
};

startServer(app);
