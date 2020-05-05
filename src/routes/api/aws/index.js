import express from "express";
import { signS3 } from "./aws.controller";

const router = express.Router();

router.post("/signS3", signS3);

export default router;
