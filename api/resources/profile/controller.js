const Joi = require("joi");
const knex = require("./service");

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

module.exports = {
  async getProfile(ctx) {
    const timeRemaining = ctx.request.timeRemaining;
    const userId = ctx.request.userId;
    try {
      const profileInfo = await knex.getProfileByUserId(userId);
      ctx.body = {
        response: profileInfo,
        timeRemaining: timeRemaining,
      };
    } catch (error) {
      console.log(error);
    }
  },
  async updateProfile(ctx) {
    const { userId, firstName, lastName, age, gender, city, email, phone } =
      ctx.request.body;
    try {
      await profileSchema.validateAsync(ctx.request.body);
      await knex.updateProfileInfo(
        userId,
        firstName,
        lastName,
        age,
        gender,
        city,
        email,
        phone
      );
      ctx.body = { response: "profile information updated" };
    } catch (error) {
      ctx.status = 500;
      ctx.body = error.code
        ? { error: error.sqlMessage }
        : { error: error.details[0].message };
    }
  },
};
