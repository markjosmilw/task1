//helpers
const {
  joiPersonalSchema,
  joiContactSchema,
} = require("../helpers/joiService");
const {
  updatePersonalInfo,
  updateContactInfo,
  getPersonalInfoById,
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

const getPersonal = async (ctx) => {
  //explain
  const userId = ctx.request.userId;
  const personalInfo = await getPersonalInfoById(userId);
  ctx.body = { response: personalInfo };
};

const updatePersonal = async (ctx) => {
  //explain
  let { userId, firstName, lastName, age, gender, city } = ctx.request.body;
  if (!userId) userId = ctx.request.params.id;
  try {
    await joiPersonalSchema(ctx.request.body);
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
  let { userId, email, phone } = ctx.request.body;
  if (!userId) userId = ctx.request.params.id;
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
  getPersonal,
  updatePersonal,
  updateContact,
};
