const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Kd o id do comentário?"],
    },
    postId:{
      type: mongoose.Types.ObjectId,
      required: [true, "Kd o id do post?"],
    },
    content: {
      type: String,
      required: [true, "Tem q ter texto no comentário"],
    },
    upVote: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);
