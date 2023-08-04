const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const moment = require("moment");

async function findUserByUsername(username) {
  return await knex("_users")
    .where({ username: username, deletedAt: null })
    .first();
}

async function createNewUser(username, password) {
  const hashedPw = await bcrypt.hash(password, 10);
  const uid = await knex("_users").insert({
    username: username,
    password: hashedPw,
  });

  await knex("_personal").insert({
    userId: uid,
  });

  await knex("_contact").insert({
    userId: uid,
  });
}

async function deleteUserById(id) {
  return await await knex("_users")
    .where({ id: id })
    .update({ deletedAt: moment().format("YYYY[-]MM[-]DD") });
}

async function getPersonalInfoById(userId) {
  return await knex("_personal")
    .select("userId", "firstName", "lastName", "age", "gender", "city")
    .where({ userId: userId })
    .first();
}

async function getContactInfoById(userId) {
  return await knex("_contact")
    .select("userId", "email", "phone")
    .where({ userId: userId })
    .first();
}

async function updatePersonalInfo(
  userId,
  firstName,
  lastName,
  age,
  gender,
  city
) {
  return await knex("_personal").where({ userId: userId }).update({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    city: city,
  });
}

async function updateContactInfo(userId, email, phone) {
  return await knex("_contact").where({ userId: userId }).update({
    email: email,
    phone: phone,
  });
}


module.exports = {
  findUserByUsername,
  createNewUser,
  deleteUserById,
  getPersonalInfoById,
  updatePersonalInfo,
  getContactInfoById,
  updateContactInfo,
};
