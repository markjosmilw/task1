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
    const timeRemaining = 60 - (now - setExpired);
    // if (timeRemaining < 0) {
    //   ctx.status = 401;
    //   ctx.body = { error: "token has expired", title: "Session timeout" };
    //   return;
    // }
    ctx.request.userId = decoded.data;
    ctx.request.timeRemaining = timeRemaining;
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "token invalid" };
    return;
  }
  return next();
};

const verifyAdmin = (ctx, next) => {
  const bearerHeader = ctx.request.headers["authorization"];
  if (!bearerHeader) {
    ctx.status = 403;
    ctx.body = { error: "bearer header required" };
    return;
  }
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
    if (decoded.data != 1) {
      ctx.status = 401;
      ctx.body = { error: "unauthorized admin access" };
      return;
    }
    const setExpired = decoded.exp;
    const now = Math.floor(Date.now() / 1000) + 60 * 60;
    const timeRemaining = 60 - (now - setExpired);
    // if (timeRemaining < 0) {
    //   ctx.status = 401;
    //   ctx.body = { error: "token has expired", title: "Session timeout" };
    //   return;
    // }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "token invalid" };
    return;
  }
  return next();
};

module.exports = { verifyUser, verifyAdmin };
