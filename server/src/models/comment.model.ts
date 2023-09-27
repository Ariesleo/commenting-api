import { sequelize } from '../db/db';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const Comment = sequelize.define('comments', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Comment content cannot be empty',
      },
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    validate: {
      isUUID: {
        args: 4, // Version 4 UUID
        msg: 'Invalid user ID format',
      },
    },
  },
  commenterName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Commenter name cannot be empty',
      },
      len: {
        args: [2, 50], // Adjust the length range as needed
        msg: 'Commenter name must be between 2 and 50 characters',
      },
    },
  },
});

export default Comment;
