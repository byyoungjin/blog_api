import express from "express";
import { getAllTags, createTag, isInTags, getTagById } from "./tag.controller";

const router = express.Router();

router.get("/allTags", getAllTags);
router.post("/newTag", createTag);
router.post("/isInTags", isInTags);

export default router;
