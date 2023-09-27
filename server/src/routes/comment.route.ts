import express, { NextFunction, Request, Response } from 'express';
import {
  createComment,
  getAllComments,
} from '../controllers/comment.controller';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// Apply verifyToken middleware to routes where authentication is required
router.use(verifyToken);

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
