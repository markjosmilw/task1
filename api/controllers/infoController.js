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
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const getInfos = async (ctx) => {
  const id = ctx.request.params.id;
  try {
    const [user] = await knex("_users")
      .where({ '_users.id': id })
      .leftJoin("_personal", { "_personal.userId": "_users.id" })
      .leftJoin("_contact", { "_contact.userId": "_users.id" });
    ctx.body = { response: user };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const updatePersonal = async (ctx) => {
  const p = ctx.request.body;
  try {
    await personalSchema.validateAsync(p);
    const [user] = await knex("_users").where({ id: p.userId });
    if (!user) {
      ctx.status = 404;
      ctx.body = { response: "user not exist" };
      return;
    }
    const [personal] = await knex("_personal").where({ userId: p.userId });
    if (personal) {
      await knex("_personal").where({ userId: p.userId }).update({
        firstName: p.firstName.toLowerCase(),
        lastName: p.lastName.toLowerCase(),
        age: p.age,
        gender: p.gender,
        city: p.city.toLowerCase(),
      });
      ctx.body = { response: "personal updated" };
      return;
    }
    await knex("_personal").insert({
      userId: p.userId,
      firstName: p.firstName.toLowerCase(),
      lastName: p.lastName.toLowerCase(),
      age: p.age,
      gender: p.gender,
      city: p.city.toLowerCase(),
    });
    ctx.body = { response: "personal added" };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

const updateContact = async (ctx) => {
  const c = ctx.request.body;
  try {
    await contactSchema.validateAsync(c);
    const [user] = await knex("_users").where({ id: c.userId });
    if (!user) {
      ctx.status = 404;
      ctx.body = { response: "user not exist" };
      return;
    }
    const [contact] = await knex("_contact").where({ userId: c.userId });
    if (contact) {
      await knex("_contact").where({ userId: c.userId }).update({
        userId: c.userId,
        email: c.email.toLowerCase(),
        phone: c.phone,
      });
      ctx.body = { response: "contact updated" };
      return;
    }
    await knex("_contact").insert({
      userId: c.userId,
      email: c.email.toLowerCase(),
      phone: c.phone,
    });
    ctx.body = { response: "contact added" };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error };
  }
};

module.exports = {
  getAll,
  getInfos,
  updatePersonal,
  updateContact,
};
