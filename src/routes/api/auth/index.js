import express from "express";
import {
  registerTraditional,
  loginTraditional,
  logout,
  whoAmI,
  loginSocial
} from "./auth.controller";
import { authMiddleware } from "@/middlewares/auth";

const router = express.Router();

router.post("/registerTraditional", registerTraditional);
router.post("/loginTraditional", loginTraditional);
router.post("/loginSocial", loginSocial);
router.get("/logout", logout);
router.get("/whoAmI", authMiddleware, whoAmI);

export default router;
