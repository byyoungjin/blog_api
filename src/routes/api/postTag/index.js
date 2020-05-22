import express from "express";

import { mapPostTag } from "./post.controller";

const router = express.Router();

router.post("/mapPostTag", mapPostTag);

export default router;
