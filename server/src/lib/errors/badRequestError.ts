import CustomAPIError from './customApi';
import statusCodes from '../../constants/statusCodes'; // Ensure the correct import path and extension

class BadRequestError extends CustomAPIError {
  status: number; // Define the 'status' property
  name: string;

  constructor(message: string) {
    super(message);
    this.status = statusCodes.BAD_REQUEST;
    this.name = 'BAD_REQUEST';
  }
}

export default BadRequestError;
