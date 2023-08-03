const jwt = require("jsonwebtoken");

const verifyUser = (ctx, next) => {
  const bearerHeader = ctx.request.headers["authorization"];
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  if (!bearerToken) {
    ctx.status = 403;
    ctx.body = { error: "token required" };
    return;
  }
  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    if (!decoded.data) {
      ctx.status = 401;
      ctx.body = { error: "unauthorized access" };
      return;
    }
    const setExpired = decoded.exp;
    const now = Math.floor(Date.now() / 1000) + 60 * 60;
    if (now - setExpired > 60) {
      ctx.status = 401;
      ctx.body = { error: "token has expired already" };
      return;
    }
    ctx.request.userId = decoded.data;
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "token invalid" };
    return;
  }
  return next();
};

const verifyAdmin = (ctx, next) => {
  return next();
};

module.exports = { verifyUser, verifyAdmin };
