import cors from 'cors';
import 'express-async-errors';
import logger from './src/utils/logger';
import config from './src/config/config';
import statusCodes from './src/constants/statusCodes';
import errorHandler from './src/middlewares/errorHandler';
import express, { Express, Request, Response, Application } from 'express';

const app: Application = express();

// Enable CORS for specified origin
app.use(
  cors({
    origin: config.appUrl,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// Handle all unhandled routes by returning a RESOURCE_NOT_FOUND error
app.all('*', (req, res, next) => {
  logger.error('Resource not found');

  res.status(statusCodes.NOT_FOUND).send({
    status: 'false',
    message: `Path not found`,
    data: {
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl,
    },
  });
});

// error middleware
app.use(errorHandler);

export default app;
