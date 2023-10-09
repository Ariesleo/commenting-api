import CustomAPIError from './customApi';
import statusCodes from '../../constants/statusCodes'; // Ensure the correct import path and extension

class UnauthorizedError extends CustomAPIError {
  status: number; // Define the 'status' property
  name: string;

  constructor(message: string) {
    super(message);
    this.status = statusCodes.UNAUTHORIZED;
    this.name = 'UNAUTHORIZED';
  }
}

export default UnauthorizedError;
