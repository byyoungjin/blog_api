import express from "express";

import { getPhotos } from "./unsplash.controller";
const router = express.Router();

router.post("/getPhotos", getPhotos);

export default router;
