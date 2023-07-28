const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../schemas/useSchema");

const regUser = async (ctx) => {
  const u = ctx.request.body;
  try {
    await userSchema.validateAsync(u);
    const exist = await knex("_users").where({ username: u.username });
    if (exist.length > 0) {
      ctx.status = 403;
      ctx.body = { error: "username already" };
      return;
    }
    const hashedPw = await bcrypt.hash(u.password, 10);
    await knex("_users").insert({
      username: u.username,
      password: hashedPw,
    });
    ctx.body = { response: "reg ok" };
  } catch (error) {
    ctx.status = 500;
    console.log(error);
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const logUser = async (ctx) => {
  const u = ctx.request.body;
  try {
    await userSchema.validateAsync(u);
    const [user] = await knex("_users").where({
      username: u.username,
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "user not exist" };
      return;
    }
    const pwMatched = await bcrypt.compare(u.password, user.password);
    if (!pwMatched) {
      ctx.status = 403;
      ctx.body = { error: "password not same" };
      return;
    }
    const token = jwt.sign(user, "secret");
    ctx.body = { response: "login ok", accessToken: token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const authTest = async (ctx) => {
  const { password, iat, ...user } = ctx.request.user;
  ctx.body = user;
};

module.exports = {
  regUser,
  logUser,
  authTest,
};
