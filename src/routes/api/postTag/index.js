import express from "express";

import { findOrMapPostTag } from "./postTag.controller";

const router = express.Router();

router.post("/findOrMapPostTag", findOrMapPostTag);

export default router;
