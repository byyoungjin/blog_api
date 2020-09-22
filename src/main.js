import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import api from "@/routes/api";
import cors from "cors";

const corsOptions = {
  origin: [/localhost:*/, "https://aws.hyjpost.com", "https://hyjpost.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  preflightContinue: true,
  credentials: true
};

const app = express();

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
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
