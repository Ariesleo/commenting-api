import { sequelize } from '../db/db';
import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CommentI } from '../Interface/comment.interface';

class Comment extends Model<CommentI> implements CommentI {
  public id!: string;
  public content!: string;
  public userId!: string;
  public commenterName!: string;
}

Comment.init(
  {
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
  },
  { sequelize, modelName: 'Comment' }
);

export default Comment;
