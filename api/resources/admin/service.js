const knex = require("../../database/knex");

module.exports = {
  async fetchUsersByPage(search, page) {
    if (!search) {
      return await knex("user")
        .select(
          "user_id",
          "first_name",
          "last_name",
          "age",
          "gender",
          "city",
          "email",
          "phone"
        )
        .innerJoin("profile", { "profile.user_id": "user.id" })
        .where({ "user.deleted_at": null })
        .limit(10)
        .offset(page == 1 ? 0 : page * 10 - 10);
    }
    return await knex("user")
      .select(
        "user_id",
        "first_name",
        "last_name",
        "age",
        "gender",
        "city",
        "email",
        "phone"
      )
      .innerJoin("profile", { "profile.user_id": "user.id" })
      .where({ "user.deleted_at": null })
      .where("profile.first_name", "like", `%${search}%`)
      .orWhere("profile.last_name", "like", `%${search}%`)
      .orWhere("profile.age", "like", `%${search}%`)
      .orWhere("profile.gender", "like", `%${search}%`)
      .orWhere("profile.city", "like", `%${search}%`)
      .orWhere("profile.email", "like", `%${search}%`)
      .orWhere("profile.phone", "like", `%${search}%`)
      .limit(10)
      .offset(page == 1 ? 0 : page * 10 - 10);
  },
  async getUsersTotalRow(search) {
    if (!search) {
      return await knex("user")
        .count("id as count")
        .where({ "user.deleted_at": null })
        .first();
    }
    return await knex("user")
      .count("user_id as count")
      .innerJoin("profile", { "profile.user_id": "user.id" })
      .where({ "user.deleted_at": null })
      .where("profile.first_name", "like", `%${search}%`)
      .orWhere("profile.last_name", "like", `%${search}%`)
      .orWhere("profile.age", "like", `%${search}%`)
      .orWhere("profile.gender", "like", `%${search}%`)
      .orWhere("profile.city", "like", `%${search}%`)
      .orWhere("profile.email", "like", `%${search}%`)
      .orWhere("profile.phone", "like", `%${search}%`)
      .first();
  },
  async deleteUserById(userId) {
    return await knex("user")
      .where({ id: userId })
      .update({ deleted_at: knex.raw(`CURTIME()`) });
  },
  async validateAdmin(adminname, password) {
    return await knex("admin")
      .where({
        adminname: adminname,
        password: password,
      })
      .first();
  },
};
