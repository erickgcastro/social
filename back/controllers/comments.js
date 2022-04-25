const UserList = require("../models/user");
const PostList = require("../models/post");
const CommentsList = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const {
  checkComment,
  checkUpVote,
  fetchComment,
  getAllUpVote,
} = require("../script");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { comments, createdBy } = await PostList.findById(postId);
  if (!comments) throw new NotFoundError(`Nenhum post com o id: ${postId}`);
  const { blackList } = await UserList.findById(req.user.userId);
  if (blackList.includes(createdBy)) {
    throw new UnauthenticatedError("Comentário negado");
  }
  const newComment = await CommentsList.create({
    ...req.body,
    createdBy: req.user.userId,
    postId,
  });
  const newList = [...comments, newComment._id];
  await PostList.findByIdAndUpdate(postId, { comments: newList });
  const commentReturned = await fetchComment([newComment]);
  res.status(StatusCodes.CREATED).json({ ...commentReturned[0] });
};

const getAllComments = async (req, res) => {
  const { postId } = req.params;
  const { page } = req.query;
  const limit = 3;
  const jump = ((page || 1) - 1) * limit;
  let { comments } = await PostList.findById(postId);
  comments = comments.splice(jump, limit);
  const filter = await checkComment(comments, req.user);
  const newList = await fetchComment(filter);
  res
    .status(StatusCodes.OK)
    .json({ count: newList.length, comments: newList.reverse() });
};

const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { createdBy } = await CommentsList.findOne({ _id: commentId, postId });
  if (createdBy != req.user.userId)
    throw new UnauthenticatedError("Acesso negado");
  const newComment = await CommentsList.findByIdAndUpdate(
    commentId,
    { content: req.body.content },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ comment: newComment });
};

const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { createdBy } = await CommentsList.findOne({ _id: commentId, postId });
  if (createdBy != req.user.userId && !req.user.adm) {
    throw new UnauthenticatedError("Acesso negado");
  }
  const commentDeleted = await CommentsList.findByIdAndDelete(commentId);
  const { comments } = await PostList.findById(postId);
  const newList = comments.filter((item) => item != commentId);
  await PostList.findByIdAndUpdate(postId, { comments: newList });
  res.status(StatusCodes.OK).json({ comment: commentDeleted });
};

const getAllUpVoteComments = async (req, res) => {
  const { commentId } = req.params;
  const upVote = await getAllUpVote(CommentsList, commentId, req.user.userId);
  res.status(StatusCodes.OK).json(upVote);
};

const upVoteComment = async (req, res) => {
  const { commentId } = req.params;
  const newList = await checkUpVote(CommentsList, commentId, req.user.userId);
  res.status(StatusCodes.OK).json(newList);
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getAllUpVoteComments,
  upVoteComment,
};
