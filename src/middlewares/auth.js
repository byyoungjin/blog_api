import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;

  if (!token) {
    res.status(403).json({
      message: "Not logged in!",
      success: false
    });
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get("jwt-token-secret"), (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });

  const onError = error => {
    res.status(403).json({
      message: error.message,
      success: false
    });
  };

  p.then(decoded => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};
