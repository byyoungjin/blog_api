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

router.get("/userId/:userId", getPostsOfUser);
router.get("/tagId/:tagId", getPostByTagId);
router.get("/all", getAllPosts);
router.get("/postId/:postId", getPostById);
router.post("/create", createPost);
router.delete("/postId/:postId", deletePost);
router.put("/postId/:postId", updatePost);

export default router;
