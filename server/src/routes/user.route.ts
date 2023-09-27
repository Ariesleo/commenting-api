import express, { NextFunction, Request, Response } from 'express';
import { postUser } from '../controllers/user.controller';

const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    postUser(req, res, next);
  });

export default router;
