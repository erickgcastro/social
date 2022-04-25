const PostList = require("../models/post");
const UserList = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const {
  checkBlocked,
  checkUpVote,
  fetchPost,
   getAllUpVote,
} = require("../script");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const createPost = async (req, res) => {
  let newPost = await PostList.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  const { posts } = await UserList.findById(req.user.userId);
  await UserList.findByIdAndUpdate(req.user.userId, {
    posts: [...posts, newPost._id],
  });
  res.status(StatusCodes.CREATED).json({ newPost });
};

const getFollowing = async (req, res) => {
  const { page } = req.query;
  const limit = 5;
  const jump = ((page || 1) - 1) * limit;
  let { following } = await UserList.findById(req.user.userId);
  let allPosts = await PostList.find({
    createdBy: [...following, req.user.userId],
  })
    .sort("-createdAt")
    .skip(Number(jump))
    .limit(limit);
  let posts = await fetchPost(allPosts);
  res.json({ posts });
};

const getAllPosts = async (req, res) => {
  const { page } = req.query;
  const limit = 5;
  const jump = ((page || 1) - 1) * limit;
  let allPosts = await PostList.find({})
    .sort("-upVote")
    .skip(Number(jump))
    .limit(limit);
  const { blackList } = await UserList.findById(req.user.userId);
  allPosts = allPosts.filter((item) => !blackList.includes(item.createdBy));
  let posts = allPosts;
  if (!req.user.adm) {
    posts = await checkBlocked(allPosts, req.user);
  }
  let newList = await fetchPost(posts);
  res.json({ count: posts.length, posts: newList });
};

const getPost = async (req, res) => {
  const { postId } = req.params;
  const postInfo = await PostList.findById(postId);
  const { blackList } = await UserList.findById(postInfo.createdBy);
  if (blackList.includes(req.user.userId) && !req.user.adm) {
    throw new UnauthenticatedError("BLOCKED");
  }
  const post = await fetchPost([postInfo]);
  res.status(StatusCodes.OK).json(post);
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const getPost = await PostList.findOneAndUpdate(
    { _id: postId, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!getPost) throw new UnauthenticatedError("O post não é seu");
  res.status(StatusCodes.OK).json({ getPost });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { createdBy } = await PostList.findById(postId);
  if (createdBy != req.user.userId && !req.user.adm) {
    throw new UnauthenticatedError("Este post não é seu");
  }
  await PostList.findByIdAndDelete(postId);
  const { posts } = await UserList.findById(createdBy);
  const newList = posts.filter((item) => item != postId);
  await UserList.findByIdAndUpdate(createdBy, {
    posts: [...newList],
  });
  res.status(StatusCodes.OK).json({ count: newList.length, newList });
};

const postAllUpVote = async (req, res) => {
  const { postId } = req.params;
  const upVote = await getAllUpVote(PostList, postId, req.user.userId);
  res.status(StatusCodes.OK).json(upVote);
};

const upVotePost = async (req, res) => {
  const { postId } = req.params;
  const newList = await checkUpVote(PostList, postId, req.user.userId);
  res.status(StatusCodes.OK).json(newList);
};

module.exports = {
  createPost,
  getAllPosts,
  postAllUpVote,
  getPost,
  updatePost,
  deletePost,
  upVotePost,
  getFollowing,
};
