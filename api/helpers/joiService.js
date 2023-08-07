const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(5),
});

const personalSchema = Joi.object({
  userId: Joi.number(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(1).max(120).required(),
  gender: Joi.string().min(4).required(),
  city: Joi.string().min(4).required(),
});

const contactSchema = Joi.object({
  userId: Joi.number(),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const profileSchema = Joi.object({
  userId: Joi.number().required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(1).max(120).required(),
  gender: Joi.string().min(4).required(),
  city: Joi.string().min(4).required(),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

async function joiUserSchema(user) {
  return userSchema.validateAsync(user);
}

async function joiPersonalSchema(personal) {
  return personalSchema.validateAsync(personal);
}

async function joiContactSchema(contact) {
  return contactSchema.validateAsync(contact);
}

async function joiProfileSchema(profile) {
  return profileSchema.validateAsync(profile)
}

module.exports = {
  joiUserSchema,
  joiPersonalSchema,
  joiContactSchema,
  joiProfileSchema
};
