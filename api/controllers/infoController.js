const knex = require("../database/knex");

//helpers
const {
  joiPersonalSchema,
  joiContactSchema,
} = require("../helpers/joiService");
const {
  fetchUsers,
  fetchUsersLikeFirstName,
  updatePersonalInfo,
  updateContactInfo,
  getPersonalInfoById,
  getContactInfoById,
} = require("../helpers/knexService");

const getAll = async (ctx) => {
  // try {
  //   const users = await knex("_users")
  //     .where({ role: "0" })
  //     .leftJoin("_personal", { "_personal.userId": "_users.id" })
  //     .leftJoin("_contact", { "_contact.userId": "_users.id" });
  //   ctx.body = { response: users };
  // } catch (error) {
  //   ctx.status = 500;
  //   ctx.body = { error: error };
  // }
};

const getInfos = async (ctx) => {
  // const id = ctx.request.params.id;
  // try {
  //   const [user] = await knex("_users")
  //     .where({ "_users.id": id })
  //     .leftJoin("_personal", { "_personal.userId": "_users.id" })
  //     .leftJoin("_contact", { "_contact.userId": "_users.id" });
  //   ctx.body = { response: user };
  // } catch (error) {
  //   ctx.status = 500;
  //   ctx.body = { error: error };
  // }
};

const getProfileInfos = async (ctx) => {
  try {
    const users = await fetchUsers();
    ctx.body = { response: users };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const searchProfileInfos = async (ctx) => {
  const search = ctx.request.params.search;
  try {
    const users = await fetchUsersLikeFirstName(search);
    ctx.body = { response: users };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const getProfile = async (ctx) => {
  //explain
  const timeRemaining = ctx.request.timeRemaining;
  const userId = ctx.request.userId;
  const personalInfo = await getPersonalInfoById(userId);
  const contactInfo = await getContactInfoById(userId);
  ctx.body = {
    profile: personalInfo,
    contact: contactInfo,
    timeRemaining: timeRemaining,
  };
};

const updatePersonal = async (ctx) => {
  //explain
  const { userId, firstName, lastName, age, gender, city } = ctx.request.body;
  const personal = { userId, firstName, lastName, age, gender, city }
  try {
    await joiPersonalSchema(personal);
    await updatePersonalInfo(userId, firstName, lastName, age, gender, city);
    ctx.body = { response: "personal information updated" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const updateContact = async (ctx) => {
  //explain
  const { userId, email, phone } = ctx.request.body;
  try {
    await joiContactSchema(ctx.request.body);
    await updateContactInfo(userId, email, phone);
    ctx.body = { response: "contact information updated" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

module.exports = {
  getAll,
  getInfos,
  getProfile,
  updatePersonal,
  updateContact,
  getProfileInfos,
  searchProfileInfos
};
