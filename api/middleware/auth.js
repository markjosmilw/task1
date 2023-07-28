const jwt = require("jsonwebtoken");

const verifyToken = (ctx, next) => {
  const token =
    ctx.request.headers["x-access-token"] || ctx.request.body.accessToken;

  if (!token) {
    ctx.status = 403;
    ctx.body = { error: "token required" };
    return;
  }

  try {
    const decoded = jwt.verify(token, "secret");
    ctx.request.user = decoded;
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "invalid token" };
    return;
  }
  return next();
};

module.exports = verifyToken;
