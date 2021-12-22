import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  PostId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Comment = mongoose.model("Comment", commentSchema);

export default Comment;
