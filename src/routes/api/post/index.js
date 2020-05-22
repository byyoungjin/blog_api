import express from "express";
import {
  getPostsOfUser,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostByTagId
} from "./post.controller";

const router = express.Router();

router.get("/getPosts/:userId", getPostsOfUser);
router.get("/postsOfTagId/:tagId", getPostByTagId);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:postId", getPostById);
router.post("/createPost", createPost);
router.post("/deletePost/:postId", deletePost);
router.put("/updatePost/:postId", updatePost);

export default router;
