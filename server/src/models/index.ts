import User from './user.model';
import logger from '../utils/logger';
import { sequelize } from '../db/db';
import Comment from './comment.model';

// Associate the Comment model with the User model to represent that a comment belongs to a user
Comment.belongsTo(User, { foreignKey: 'userId' });

// Sync the models with the database
sequelize.sync({ force: false }).then(() => {
  logger.info('Database & tables created!');
});

export { User, Comment };
