import express from "express";

import { findOrMapPostTag, deletePostTagMapping } from "./postTag.controller";

const router = express.Router();

router.post("/findOrMapPostTag", findOrMapPostTag);
router.delete("/deletePostTagMapping/:PostId/:TagId", deletePostTagMapping);

export default router;
