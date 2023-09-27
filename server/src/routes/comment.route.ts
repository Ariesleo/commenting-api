import express, { NextFunction, Request, Response } from 'express';
import {
  createComment,
  getAllComments,
} from '../controllers/comment.controller';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    createComment(req, res, next);
  });
router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    getAllComments(req, res, next);
  });

export default router;
