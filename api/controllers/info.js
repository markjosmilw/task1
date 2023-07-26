const knex = require("../database/knex");
const Joi = require("joi");

const infoSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(0).max(150).required(),
  address: Joi.string().min(5).required(),
});

const contactSchema = Joi.object({
  email: Joi.string().min(10).required(),
  phone: Joi.number().min(11).required(),
  userId: Joi.number().min(1).required(),
});

const getInfos = async (ctx) => {
  try {
    const infos = await knex("contact_info").rightJoin("basic_info", {
      "basic_info.id": "contact_info.userId",
    });
    ctx.body = { infos: infos };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

const postInfo = async (ctx) => {
  const info = ctx.request.body;
  try {
    await infoSchema.validateAsync(info);
    await knex("basic_info").insert({
      name: info.name,
      age: info.age,
      address: info.address,
    });
    ctx.body = {
      message: `Data received. Let's proceed to the next form.`,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const postContact = async (ctx) => {
  const contact = ctx.request.body;
  try {
    await contactSchema.validateAsync(contact);
    await knex("contact_info").insert({
      email: contact.email,
      phone: contact.phone,
      userId: contact.userId,
    });
    ctx.body = { message: "Data received" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const updateContact = async (ctx) => {
  const contact = ctx.request.body;
  try {
    await contactSchema.validateAsync(contact);
    await knex("contact_info")
      .where("userId", contact.userId)
      .update({ email: contact.email, phone: contact.phone });
    ctx.body = { message: "Contact updated succesfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

module.exports = {
  getInfos,
  postInfo,
  postContact,
  updateContact,
};
