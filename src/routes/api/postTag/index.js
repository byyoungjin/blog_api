import express from "express";

import { findOrMapPostTag, deletePostTagMapping } from "./postTag.controller";

const router = express.Router();

router.post("/findOrMap", findOrMapPostTag);
router.delete("/postId/:PostId/tagId/:TagId", deletePostTagMapping);

export default router;
