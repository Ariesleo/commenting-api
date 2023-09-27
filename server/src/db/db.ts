import { Sequelize } from 'sequelize';
import logger from '../utils/logger';
import config from '../config/config';

const connectionUrl: string | undefined = config.dbConnectionUri;
let sequelize: Sequelize;

if (connectionUrl) {
  sequelize = new Sequelize(connectionUrl);
} else {
  sequelize = new Sequelize(config.db.name, 'postgres', config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
}

const db = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection successful');
  } catch (error) {
    logger.error('Database connection failed:', error);
  }
};

export { sequelize, db };
