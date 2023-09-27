import { register, login } from '../controllers/user.controller';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router
  .route('/register')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    register(req, res, next);
  });
router
  .route('/login')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    login(req, res, next);
  });

export default router;
