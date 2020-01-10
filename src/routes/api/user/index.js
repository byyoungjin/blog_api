import express from "express";
import { list, assignAdmin } from "./user.controller";

const router = express.Router();

router.get("/list", list);

router.post("/assignAdmin/:emailAddress", assignAdmin);

export default router;
