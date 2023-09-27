import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../db/db';
import { Model, DataTypes } from 'sequelize';
import { UserI } from '../Interface/user.interface';

class User extends Model<UserI> implements UserI {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
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
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Hash the password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

export default User;
