const jwt = require("jsonwebtoken");

const verifyToken = (ctx, next) => {
  console.log(ctx.request.headers);
  const token = ctx.request.body.accessToken;

  if (!token) {
    ctx.status = 403;
    ctx.body = { error: "token required" };
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    ctx.request.user = decoded;
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "invalid token" };
    return;
  }
  return next();
};

module.exports = verifyToken;
