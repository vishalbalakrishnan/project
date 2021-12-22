import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  upVote,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Hello There");
});

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);
router.get("/getPost/:id", getPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
router.patch("/:id/upvote", upVote);

export default router;
