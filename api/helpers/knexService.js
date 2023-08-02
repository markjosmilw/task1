const knex = require("../database/knex");
const bcrypt = require("bcrypt");

async function findUserByUsername(username) {
  return await knex("_users").where({ username: username }).first();
}

async function createNewUser(username, password) {
  const hashedPw = await bcrypt.hash(password, 10);
  return await knex("_users").insert({
    username: username,
    password: hashedPw,
  });
}

module.exports = {
  findUserByUsername,
  createNewUser,
};
