const jwt = require("jsonwebtoken");

const authMiddleware = (
  req,
  res,
  next
) => {

  const token =
    req.headers.authorization;

  if (!token) {
    return res.json({
      message: "Access Denied"
    });
  }

  try {

    const decoded =
      jwt.verify(
        token,
        "akash_secret_key"
      );

    req.user = decoded;

    next();

  } catch {

    return res.json({
      message: "Invalid Token"
    });
  }
};

module.exports =
  authMiddleware;