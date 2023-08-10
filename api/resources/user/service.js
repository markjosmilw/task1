const knex = require("../../database/knex");
const bcrypt = require("bcrypt");

module.exports = {
  async createNewUser(username, password, firstName, lastName) {
    const user = await knex("user")
      .where({
        username: username,
        deleted_at: null,
      })
      .first();
    if (user) {
      return { error: "this user has already exist" };
    }
    const hashedPw = await bcrypt.hash(password, 10);
    const id = await knex("user").insert({
      username: username,
      password: hashedPw,
    });
    await knex("profile").insert({
      user_id: id,
      first_name: firstName,
      last_name: lastName,
    });
    return;
  },
  async validateUser(username, password) {
    const user = await knex("user")
      .where({
        username: username,
        deleted_at: null,
      })
      .first();
    if (!user) {
      return { error: "this user does not exist" };
    }
    const pwMatched = await bcrypt.compare(password, user.password);
    if (!pwMatched) {
      return { error: "incorrect password" };
    }
    return user;
  },
};
