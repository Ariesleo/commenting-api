import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

const config = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    name: env.DB_NAME,
  },
  appUrl: env.APP_URL,
  port: env.PORT || 8080,
  dbConnectionUri: env.DB_CONNECTION_URI,
};

export default config;
