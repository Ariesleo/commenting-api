import { NextFunction, Request, Response } from 'express';
import { UserI } from '../Interface/user.interface';
import statusCodes from '../constants/statusCodes';
import * as userService from '../services/user.service';
import BadRequestError from '../lib/errors/badRequestError';

const register = async (req: Request, res: Response, next: NextFunction) => {
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

const login = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  const { email, password } = payload;

  if (!email || !password) {
    throw new BadRequestError('All fields are required.');
  }

  try {
    const loginUser = await userService.signInUser(payload);

    res.status(statusCodes.OK).send({
      success: 'true',
      message: 'User logged In',
      data: loginUser,
    });
  } catch (err) {
    next(err);
  }
};

export { register, login };
