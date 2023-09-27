import statusCodes from '../constants/statusCodes';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../lib/errors/badRequestError';
import * as commentService from '../services/comment.service';

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { content, userId, commenterName } = payload;

  if (!content || !userId || !commenterName) {
    throw new BadRequestError(`Missing fields.`);
  }

  try {
    const commentRes = await commentService.addComment(payload);
    res.status(statusCodes.CREATED).send({
      success: 'true',
      message: 'Comment Created',
      data: commentRes,
    });
  } catch (err) {
    next(err);
  }
};
const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentRes = await commentService.fetchAllComments();
    res.status(statusCodes.OK).send({
      success: 'true',
      message: 'Comment Created',
      data: commentRes,
    });
  } catch (err) {
    next(err);
  }
};

export { createComment, getAllComments };
