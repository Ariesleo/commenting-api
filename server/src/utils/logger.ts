import { createLogger, format, transports } from 'winston';
import { join } from 'path';

const logFolder = 'logs'; // Specify the folder name

// Format in which log is to be displayed
const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// logger object
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    // Store logs for overall levels
    new transports.File({
      filename: join(logFolder, 'combined.log'), // Store logs in 'logs' folder
    }),
    // Store logs for minimum level error
    new transports.File({
      filename: join(logFolder, 'app-error.log'), // Store error logs in 'logs' folder
      level: 'error',
    }),
  ],
  // transports for unhandled exceptions
  exceptionHandlers: [
    new transports.File({ filename: join(logFolder, 'exception.log') }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: join(logFolder, 'rejections.log') }),
  ],
});

export default logger;
