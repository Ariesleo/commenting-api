import CustomAPIError from './customApi';
import statusCodes from '../../constants/statusCodes'; // Ensure the correct import path and extension

class ResourceNotFoundError extends CustomAPIError {
  status: number; // Define the 'status' property
  name: string;

  constructor(message: string) {
    super(message);
    this.status = statusCodes.NOT_FOUND;
    this.name = 'RESOURCE_NOT_FOUND';
  }
}

export default ResourceNotFoundError;
