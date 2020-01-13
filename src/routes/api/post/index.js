import express from "express";
import {
  getPostsOfUser,
  getPostById,
  createPost,
  deletePost,
  updatePost
} from "./post.controller";

const router = express.Router();

router.get("/getPosts/:userId", getPostsOfUser);
router.get("/getPost/:postId", getPostById);
router.post("/createPost", createPost);
router.post("/deletePost/:postId", deletePost);
router.put("/updatePost/:postId", updatePost);

export default router;
