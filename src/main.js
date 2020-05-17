import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import api from "@/routes/api";
import config from "@/config";
import cors from "cors";

const corsOptions = {
  origin: [/https:\/\/hyjpost\.com.*/, /localhost:*/],
  methods: ["GET", "POST", "PUT", "DELETE"],
  preflightContinue: true
};

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.set("jwt-token-secret", config.secret);
app.use("/api", api);

app.use((req, res, next) => {
  res.status(404).json({
    messagee: "Route not Found"
  });
});

app.use((err, req, res, next) => {
  console.log("err.message", err.message);
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

export default app;
