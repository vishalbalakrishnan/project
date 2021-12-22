import express from "express";

import {
  addComment,
  upVote,
  deleteComment,
  getComments,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Hello Comments");
});

router.get("/getComments", getComments);
router.post("/addComment", addComment);
router.patch("/upvote", upVote);
router.delete("/deleteComment", deleteComment);

export default router;
