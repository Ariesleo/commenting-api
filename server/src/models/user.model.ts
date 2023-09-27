import { sequelize } from '../db/db';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty',
      },
      len: {
        args: [2, 50], // Minimum and maximum length for the name
        msg: 'Name must be between 2 and 50 characters',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email address',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty',
      },
      len: {
        args: [8, 255], // Minimum and maximum length for the password
        msg: 'Password must be minimum 8 characters',
      },
    },
  },
});

export default User;
