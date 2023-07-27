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

module.exports = {
  infoSchema,
  contactSchema,
};
