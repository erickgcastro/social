const express = require("express");
const router = express.Router();

const {
  createPost,
  getFollowing,
  getAllPosts,
  getPost,
  updatePost,
  postAllUpVote,
  deletePost,
  upVotePost,
} = require("../controllers/posts");

const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getAllUpVoteComments,
  upVoteComment,
} = require("../controllers/comments");

router.route("/following").get(getFollowing);
router.route("/").get(getAllPosts).post(createPost);
router.route("/:postId/upvote").patch(upVotePost).get(postAllUpVote);
router.route("/:postId").get(getPost).patch(updatePost).delete(deletePost);

router.route("/:postId/comments").get(getAllComments).post(createComment);
router
  .route("/:postId/comments/:commentId")
  .patch(updateComment)
  .delete(deleteComment);
router
  .route("/:postId/comments/:commentId/upvote")
  .patch(upVoteComment)
  .get(getAllUpVoteComments);

module.exports = router;
