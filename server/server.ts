import app from './app';
import logger from './src/utils/logger';
import config from './src/config/config';

const { port } = config;

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
