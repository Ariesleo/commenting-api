import app from './app';
import { db } from './src/db/db';
import logger from './src/utils/logger';
import config from './src/config/config';

const { port } = config;

// connnect to database
db();

app.listen(port, () => {
  console.clear();
  console.log(`Server is Fire at http://localhost:${port}`);
});

// Graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}, shutting down`);
    process.exit(0);
  });
});
