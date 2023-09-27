import * as userDAO from '../daos/user.dao';
import UserI from '../Interface/user.interface';

const addUser = async (payload: UserI) => {
  try {
    const userRes = await userDAO.createUser(payload);
    return userRes;
  } catch (err) {
    throw err;
  }
};

export { addUser };
