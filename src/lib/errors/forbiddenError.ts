import CustomAPIError from './customApi';
import statusCodes from '../../constants/statusCodes'; // Ensure the correct import path and extension

class ForbiddenError extends CustomAPIError {
  status: number; // Define the 'status' property
  name: string;

  constructor(message: string) {
    super(message);
    this.status = statusCodes.FORBIDDEN;
    this.name = 'FORBIDDEN';
  }
}

export default ForbiddenError;
