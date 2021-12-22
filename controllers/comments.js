import mongoose from "mongoose";
import Comment from "../models/commentsModel.js";

//gets all the comments of a particular post
export const getComments = async (req, res) => {
  if (!(req.query && req.query.id))
    return res.status(404).send(`Required params Id is missing`);
  const id = req.query.id;
  try {
    const comments = await Comment.find({ PostId: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//add a comment to a particular post
export const addComment = async (req, res) => {
  if (!(req.query && req.query.id))
    return res.status(404).send(`Required params Id is missing`);
  const id = req.query.id;
  const { message, author } = req.body;
  const newComment = new Comment({
    PostId: id,
    message,
    author,
  });
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//increments the vote of a particular comment
export const upVote = async (req, res) => {
  if (!(req.query && req.query.id))
    return res.status(404).send(`Required params Id is missing`);
  const id = req.query.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No comment with id: ${id}`);

  const comment = await Comment.findById(id);

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { votes: comment.votes + 1 },
    { new: true }
  );

  res.json(updatedComment);
};

//delete a particular comment
export const deleteComment = async (req, res) => {
  if (!(req.query && req.query.id))
    return res.status(404).send(`Required params Id is missing`);
  const id = req.query.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No comment with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
