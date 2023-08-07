const knex = require("../database/knex");
const bcrypt = require("bcrypt");
const moment = require("moment");
const random = require("random-name");

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
    .where("_personal.firstName", "like", `${search}%`)
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

async function findAdminByUsername(username) {
  return await knex("_users").where({ username: username, isAdmin: 1 }).first();
}

async function getProfileInfoByUserId(userId) {
  return await knex("_personal")
    .leftJoin("_contact", {
      "_contact.userId": "_personal.userId",
    })
    .where({ "_personal.userId": userId })
    .first();
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
  await knex("_personal").where({ userId: userId }).update({
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    city: city,
  });
  await knex("_contact").where({ userId: userId }).update({
    email: email,
    phone: phone,
  });
  return;
}

module.exports = {
  findUserByUsername,
  fetchUsers,
  createNewUser,
  deleteUserById,
  findAdminByUsername,
  fetchUsersLikeFirstName,
  updateProfileInfo,
  getProfileInfoByUserId,
};
