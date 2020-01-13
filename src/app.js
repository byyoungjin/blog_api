import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import api from "@/routes/api";
import config from "@/config";
import cors from "cors";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.set("jwt-token-secret", config.secret);
app.use("/api", api);

export default app;
