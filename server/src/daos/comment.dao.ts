import { Comment } from '../models';
import { CommentI } from '../Interface/comment.interface';

const createComment = async (payload: CommentI) => {
  try {
    //   create new comment
    const newUser = await Comment.create(payload);
    return newUser;
  } catch (err) {
    throw err;
  }
};

const getAllComments = async () => {
  try {
    const comments = await Comment.findAll();
    return comments;
  } catch (err) {
    throw err;
  }
};

export { createComment, getAllComments };
