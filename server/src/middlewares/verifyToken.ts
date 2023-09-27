import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from '../config/config';
import ForbiddenError from '../lib/errors/forbiddenError';
import UnauthorizedError from '../lib/errors/unauthorizedError';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  try {
    if (!token) {
      throw new ForbiddenError('Access denied.');
    } else {
      const tokenString = token.split(' ')[1];
      jwt.verify(
        tokenString,
        config.jwtSecret,
        (err: Error | null, decoded: any) => {
          if (err) {
            if (err instanceof TokenExpiredError) {
              throw new UnauthorizedError('Unauthorized. Token expired');
            } else {
              throw new ForbiddenError('Access denied.');
            }
          }

          req = decoded as any;
          next();
        }
      );
    }
  } catch (e) {
    next(e);
  }
};

export default verifyToken;
