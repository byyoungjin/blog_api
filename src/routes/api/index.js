import express from "express";
import auth from "./auth";
import user from "./user";
import post from "./post";
import { authMiddleware } from "@/middlewares/auth";

const router = express.Router();

router.use("/auth", auth);
router.use("/user", authMiddleware);
router.use("/user", user);
router.use("/post", post);

export default router;
