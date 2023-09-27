import logger from '../utils/logger';
import statusCodes from '../constants/statusCodes';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.status || statusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  // Handle database errors

  // Validation error
  if (err.name === 'SequelizeValidationError') {
    defaultError.statusCode = statusCodes.BAD_REQUEST;
    defaultError.msg = err.errors.map((e: any) => e.message).join(',');
  }

  // Data already exists error
  if (err.name === 'SequelizeUniqueConstraintError') {
    defaultError.statusCode = statusCodes.CONFLICT;
    defaultError.msg =
      err.errors.map((e: any) => e.message).join(',') +
      ' ' +
      'Data already exists';
  }

  if (err.name === 'SequelizeDatabaseError') {
    defaultError.statusCode = statusCodes.BAD_REQUEST;
    defaultError.msg = 'Issue with the data types. Check your data type.';
    logger.error(
      'You might have provided the INTEGER data type instead of STRING'
    );
  }

  const analytics = {
    success: 'false',
    message: defaultError.msg,
    code: err.name,
    data: err.errors,
  };

  logger.error(JSON.stringify(analytics));

  res.status(defaultError.statusCode).json(analytics);
};

export default errorHandler;
