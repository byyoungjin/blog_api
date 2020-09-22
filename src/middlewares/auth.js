import jwt from "jsonwebtoken";

import { wrapperAsync } from "@/helper";
import config from "config";

export const authMiddleware = wrapperAsync(async (req, res, next) => {
  const token = req.cookies.AUTH_ACCESS_TOKEN;

  if (!token) {
    const error = new Error("Not logged in!");
    error.status = 403;
    throw error;
  }

  jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
    if (err) {
      res.status(403).send(err.name);
    }
    console.log("decoded", decoded);
    req.decoded = decoded;
    next();
  });
});
