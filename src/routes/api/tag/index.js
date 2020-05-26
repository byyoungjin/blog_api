import express from "express";
import {
  getAllTags,
  findOrCreateTag,
  deleteTag,
  getTagsOfPostId,
  isInTags
} from "./tag.controller";

const router = express.Router();

router.get("/allTags", getAllTags);
router.post("/findOrCreateTag", findOrCreateTag);
router.post("/isInTags", isInTags);
router.delete(`/deleteTag/:tagId`, deleteTag);
router.get("/tagsOfPostId/:postId", getTagsOfPostId);

export default router;
