import express from "express";
import { register, login, whoAmI } from "./auth.controller";
import { authMiddleware } from "@/middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/whoAmI", authMiddleware, whoAmI);

export default router;
