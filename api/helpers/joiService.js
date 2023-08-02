const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(5),
});

const personalSchema = Joi.object({
  userId: Joi.number().required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(1).max(120).required(),
  gender: Joi.string().min(4).required(),
  city: Joi.string().min(4).required(),
});

const contactSchema = Joi.object({
  userId: Joi.number().required(),
  email: Joi.string().required().email(),
  phone: Joi.number().required(),
});

async function joiUserSchema(user) {
  return userSchema.validateAsync(user);
}

module.exports = {
  joiUserSchema,
};
