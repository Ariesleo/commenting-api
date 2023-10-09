import * as userDAO from '../daos/user.dao';
import createToken from '../utils/createToken';
import { UserI, LoginUserI } from '../Interface/user.interface';
import BadRequestError from '../lib/errors/badRequestError';

const addUser = async (payload: UserI) => {
  const { name, email, password } = payload;
  if (!name || !email || !password) {
    throw new BadRequestError(`All fields are required`);
  }
  try {
    const userRes = await userDAO.createUser(payload);
    const { id, name, email } = userRes;

    const user = {
      id,
      name,
      email,
    };

    let token;

    if (userRes) {
      token = createToken(payload);
    }

    return { user, token };
  } catch (err) {
    throw err;
  }
};

const signInUser = async (payload: LoginUserI) => {
  try {
    let token;
    const userRes = await userDAO.loginUser(payload);

    const { id, name, email } = userRes;

    const user = {
      id,
      name,
      email,
    };

    if (userRes) {
      token = createToken(payload);
    }

    return { user, token };
  } catch (err) {
    throw err;
  }
};

export { addUser, signInUser };
