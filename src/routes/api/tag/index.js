import express from "express";
import { getAllTags, findOrCreateTag } from "./tag.controller";

const router = express.Router();

router.get("/allTags", getAllTags);
router.post("/findOrCreateTag", findOrCreateTag);

export default router;
