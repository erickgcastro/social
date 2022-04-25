const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Kd o id do criador?"],
    },
    content: {
      type: String,
      required: [true, "Kd o conteúdo?"],
    },
    comments: {
      type: Array,
      default: [],
    },
    upVote: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
