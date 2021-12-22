import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
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
  tags: [String],
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Post = mongoose.model("Post", postSchema);

export default Post;
