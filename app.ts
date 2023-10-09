import cors from 'cors';
import logger from './src/utils/logger';
import config from './src/config/config';
import userRouter from './src/routes/user.route';
import statusCodes from './src/constants/statusCodes';
import commentRouter from './src/routes/comment.route';
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

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

// Handle all unhandled routes by returning a RESOURCE_NOT_FOUND error
app.all('*', (req: Request, res: Response) => {
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
