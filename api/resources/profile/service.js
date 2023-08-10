const knex = require("../../database/knex");

module.exports = {
  async getProfileByUserId(userId) {
    return await knex("user")
      .innerJoin("profile")
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
      .where({ "profile.user_id": userId })
      .first();
  },
  async updateProfileInfo(
    userId,
    firstName,
    lastName,
    age,
    gender,
    city,
    email,
    phone
  ) {
    return await knex("profile").where({ user_id: userId }).update({
      first_name: firstName,
      last_name: lastName,
      age: age,
      gender: gender,
      city: city,
      email: email,
      phone: phone,
    });
  },
};
