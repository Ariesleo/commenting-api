import bcrypt from 'bcryptjs';
import { User } from '../models';
import { LoginUserI, UserI } from '../Interface/user.interface';
import BadRequestError from '../lib/errors/badRequestError';
import UnauthorizedError from '../lib/errors/unauthorizedError';

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

const loginUser = async (payload: LoginUserI) => {
  const { email, password } = payload;
  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, return the user
      return user;
    } else {
      // Passwords don't match, throw an error
      throw new UnauthorizedError('Invalid email or password');
    }
  } catch (err) {
    throw err;
  }
};

export { createUser, loginUser };
