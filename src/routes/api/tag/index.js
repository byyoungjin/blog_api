import express from "express";
import { getAllTags, findOrCreateTag, deleteTag } from "./tag.controller";

const router = express.Router();

router.get("/allTags", getAllTags);
router.post("/findOrCreateTag", findOrCreateTag);

router.delete(`/deleteTag/:tagId`, deleteTag);

export default router;
