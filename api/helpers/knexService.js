const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const moment = require("moment");

async function findUserByUsername(username) {
  return await knex("_users")
    .where({ username: username, deletedAt: null, isAdmin: 0 })
    .first();
}

async function fetchUsers() {
  return await knex("_users")
    //.where({ isAdmin: 0, deletedAt: null })
    .leftJoin("_personal", { "_personal.userId": "_users.id" })
    .leftJoin("_contact", { "_contact.userId": "_users.id" })
    .where({ "_users.deletedAt": null, "_users.isAdmin": 0 });
}

async function fetchUsersLikeFirstName(search) {
  return await knex("_users")
    .leftJoin("_personal", { "_personal.userId": "_users.id" })
    .leftJoin("_contact", { "_contact.userId": "_users.id" })
    .where("_personal.firstName", "like", `%${search}%`)
    .where({ "_users.deletedAt": null, "_users.isAdmin": 0 });
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
  return;
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

async function findAdminByUsername(username) {
  return await knex("_users").where({ username: username, isAdmin: 1 }).first();
}

module.exports = {
  findUserByUsername,
  fetchUsers,
  createNewUser,
  deleteUserById,
  getPersonalInfoById,
  updatePersonalInfo,
  getContactInfoById,
  updateContactInfo,
  findAdminByUsername,
  fetchUsersLikeFirstName,
};
