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
      ctx.body = { error: "this username has already exist" };
      return;
    }
    const hashedPw = await bcrypt.hash(u.password, 10);
    await knex("_users").insert({
      username: u.username,
      password: hashedPw,
    });
    ctx.body = { response: "registration succesfull" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const logUser = async (ctx) => {
  const u = ctx.request.body;
  try {
    const [user] = await knex("_users").where({
      username: u.username,
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "this user does not exist" };
      return;
    }
    const pwMatched = await bcrypt.compare(u.password, user.password);
    if (!pwMatched) {
      ctx.status = 403;
      ctx.body = { error: "incorrect password" };
      return;
    }
    const token = jwt.sign(user, process.env.SECRET_KEY);
    ctx.body = { response: "login successful", accessToken: token };
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
