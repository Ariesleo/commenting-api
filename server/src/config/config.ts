import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

interface Config {
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  appUrl: string;
  port: number;
  dbConnectionUri: string;
}

const config: Config = {
  db: {
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '5432', 10), // Parse as an integer with base 10
    user: env.DB_USER || 'your_default_user',
    password: env.DB_PASSWORD || 'your_default_password',
    name: env.DB_NAME || 'your_default_db_name',
  },
  appUrl: env.APP_URL || 'http://localhost:8080',
  port: parseInt(env.PORT || '8080', 10), // Parse as an integer with base 10
  dbConnectionUri: env.DB_CONNECTION_URI || '',
};

export default config;
