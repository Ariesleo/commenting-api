import jwt from 'jsonwebtoken';
import config from '../config/config';
import { LoginUserI, UserI } from '../Interface/user.interface';

// Define a function to create a JWT token
const createToken = (user: UserI | LoginUserI): string => {
  // Create a payload with user information (you can include additional data as needed)
  const payload = {
    userEmail: user.email,
    // Add other user-related data here
  };

  // Generate a JWT token with the payload and your secret key
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtLifetime,
  });

  return token;
};

export default createToken;
