import { CommentI } from '../Interface/comment.interface';
import * as commentDAO from '../daos/comment.dao';

const addComment = async (payload: CommentI) => {
  try {
    const commentRes = await commentDAO.createComment(payload);
    return commentRes;
  } catch (err) {
    throw err;
  }
};
const fetchAllComments = async () => {
  try {
    const commentRes = await commentDAO.getAllComments();
    return commentRes;
  } catch (err) {
    throw err;
  }
};

export { addComment, fetchAllComments };
