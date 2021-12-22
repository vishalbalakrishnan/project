import mongoose from "mongoose";
import Post from "../models/postsModel.js";

//get all the posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get a single post using the id
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create a post
export const createPost = async (req, res) => {
  const { title, message, author, tags } = req.body;
  const newPostMessage = new Post({
    title,
    message,
    author,
    tags,
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//updates the properties of a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, author, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { author, title, message, tags, _id: id };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

//deletes a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

//increments the vote of a particular post
export const upVote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { votes: post.votes + 1 },
    { new: true }
  );

  res.json(updatedPost);
};