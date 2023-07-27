const knex = require("../database/knex");
const { userSchema } = require("../schemas/useSchema");
const bcrypt = require("bcrypt");

const regUser = async (ctx) => {
  const u = ctx.request.body;
  try {
    await userSchema.validateAsync(u);
    const exist = await knex("_users").where({ username: u.username });
    if (exist.length > 0) {
      ctx.status = 403;
      ctx.body = { response: "username already" };
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
    ctx.body = { error: error };
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
      ctx.body = { response: "username not exist" };
      return;
    }
    const pwMatched = await bcrypt.compare(u.password, user.password);
    if (!pwMatched) {
      ctx.status = 403;
      ctx.body = { response: "password not same" };
      return;
    }
    ctx.body = { response: "login ok" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

module.exports = {
  regUser,
  logUser,
};
