const knex = require("../database/knex");
const { personalSchema, contactSchema } = require("../schemas/useSchema");

const getAll = async (ctx) => {
  try {
    const users = await knex("_users")
      .where({ role: "0" })
      .leftJoin("_personal", { "_personal.userId": "_users.id" })
      .leftJoin("_contact", { "_contact.userId": "_users.id" });
    ctx.body = { response: users };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const getInfos = async (ctx) => {
  const id = ctx.request.params.id;
  try {
    const [user] = await knex("_users")
      .where({ "_users.id": id })
      .leftJoin("_personal", { "_personal.userId": "_users.id" })
      .leftJoin("_contact", { "_contact.userId": "_users.id" });
    ctx.body = { response: user };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const updatePersonal = async (ctx) => {
  //const p = ctx.request.body;
  const { userId, firstName, lastName, age, gender, city } = ctx.request.body;
  try {
    await personalSchema.validateAsync(ctx.request.body);
    const user = await knex("_personal").where({ userId: userId }).first();
    ctx.body = user

    // if (personal) {
    //   await knex("_personal").where({ userId: p.userId }).update({
    //     firstName: p.firstName.toLowerCase(),
    //     lastName: p.lastName.toLowerCase(),
    //     age: p.age,
    //     gender: p.gender,
    //     city: p.city.toLowerCase(),
    //   });
    //   ctx.body = { response: "personal information updated" };
    //   return;
    // }
    // await knex("_personal").insert({
    //   userId: p.userId,
    //   firstName: p.firstName.toLowerCase(),
    //   lastName: p.lastName.toLowerCase(),
    //   age: p.age,
    //   gender: p.gender,
    //   city: p.city.toLowerCase(),
    // });
    // ctx.body = { response: "personal information saved" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const updateContact = async (ctx) => {
  const c = ctx.request.body;
  try {
    await contactSchema.validateAsync(c);
    const [user] = await knex("_users").where({ id: c.userId });
    if (!user) {
      ctx.status = 404;
      ctx.body = { response: "this user does not exist" };
      return;
    }
    const [contact] = await knex("_contact").where({ userId: c.userId });
    if (contact) {
      await knex("_contact").where({ userId: c.userId }).update({
        userId: c.userId,
        email: c.email.toLowerCase(),
        phone: c.phone,
      });
      ctx.body = { response: "contact information updated" };
      return;
    }
    await knex("_contact").insert({
      userId: c.userId,
      email: c.email.toLowerCase(),
      phone: c.phone,
    });
    ctx.body = { response: "contact information saved" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const deleteInfos = async (ctx) => {
  const id = ctx.request.params.id;
  try {
    await knex("_contact").where({ userId: id }).del();
    await knex("_personal").where({ userId: id }).del();
    await knex("_users").where({ id: id }).del();
    ctx.body = { response: "user deleted" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.sqlMessage };
  }
};

module.exports = {
  getAll,
  getInfos,
  updatePersonal,
  updateContact,
  deleteInfos,
};
