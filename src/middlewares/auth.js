import jwt from "jsonwebtoken";

import { wrapperAsync } from "@/helper";

export const authMiddleware = wrapperAsync(async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;

  if (!token) {
    const error = new Error("Not logged in!");
    error.status = 403;
    throw error;
  }
  const decoded = jwt.verify(token, req.app.get("jwt-token-secret"));
  req.decoded = decoded;
  next();
});
