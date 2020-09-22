import express from "express";
import {
  getAllTags,
  findOrCreateTag,
  deleteTag,
  getTagsOfPostId,
  isInTags
} from "./tag.controller";

const router = express.Router();

router.get("/all", getAllTags);
router.post("/findOrCreate", findOrCreateTag);
router.post("/isInTags", isInTags);
router.delete(`/tagId/:tagId`, deleteTag);
router.get("/postId/:postId", getTagsOfPostId);

export default router;
