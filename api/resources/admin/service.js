const knex = require("../../database/knex");

async function fetchUsersByPage(page) {
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

async function getTotalRows(search) {
  if (search) {
    return await knex("user")
      .count("user_id as count")
      .innerJoin("profile", { "profile.user_id": "user.id" })
      .where({ "user.deleted_at": null })
      .where("profile.first_name", "like", `%${searchInput}%`)
      .first();
  }
  return await knex("user")
    .count("id as count")
    .where({ "user.deleted_at": null })
    .first();
}

module.exports = {
  fetchUsersByPage,
  getTotalRows,
};
