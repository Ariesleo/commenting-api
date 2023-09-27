import { User } from '../models';
import UserI from '../Interface/user.interface';
import BadRequestError from '../lib/errors/badRequestError';

const createUser = async (payload: UserI) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new BadRequestError(
        `User with the email: ${payload.email} already exists.`
      );
    }

    //   create new user
    const newUser = await User.create(payload);
    return newUser;
  } catch (err) {
    throw err;
  }
};

export { createUser };
