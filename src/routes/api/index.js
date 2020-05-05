import express from "express";
import auth from "./auth";
import user from "./user";
import post from "./post";
import aws from "./aws";
import unSplash from "./unSplash";
import { authMiddleware } from "@/middlewares/auth";

const router = express.Router();

router.use("/auth", auth);
router.use("/user", authMiddleware);
router.use("/user", user);
router.use("/post", post);
router.use("/aws", aws);
router.use("/unSplash", unSplash);

export default router;
