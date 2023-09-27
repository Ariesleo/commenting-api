import { NextFunction, Request, Response } from 'express';
import UserI from '../Interface/user.interface';
import statusCodes from '../constants/statusCodes';
import * as userService from '../services/user.service';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const payload: UserI = req.body;

  try {
    const userData = await userService.addUser(payload);

    res.status(statusCodes.CREATED).send({
      success: 'true',
      message: 'User Created',
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};

export { postUser };
