const knex = require("../../database/knex");

async function getProfileByUserId(userId) {
  return await knex('profile')
  .where({'profile.user_id': userId})
  .first()
}

async function updateProfileInfo(
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
    phone: phone
  });
}

module.exports = {
  getProfileByUserId,
  updateProfileInfo
};
