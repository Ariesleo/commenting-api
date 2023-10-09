import CustomAPIError from './customApi';
import statusCodes from '../../constants/statusCodes'; // Ensure the correct import path and extension

class InternalServerError extends CustomAPIError {
  status: number; // Define the 'status' property
  name: string;

  constructor(message: string) {
    super(message);
    this.status = statusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'INTERNAL_SERVER_ERROR';
  }
}

export default InternalServerError;
