const Joi = require("joi");
const { getProfileByUserId, updateProfileInfo } = require("./service");

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

const getMyProfile = async (ctx) => {
  const timeRemaining = ctx.request.timeRemaining;
  const userId = ctx.request.userId;
  try {
    const profileInfo = await getProfileByUserId(userId);
    ctx.body = {
      response: profileInfo,
      timeRemaining: timeRemaining
    };
  } catch (error) {
    console.log(error);
  }
};

const updateMyProfile = async (ctx) => {
  const { userId, firstName, lastName, age, gender, city, email, phone } = ctx.request.body
  const thisUserId = ctx.request.userId
  if(thisUserId != userId) {
    ctx.status = 401;
    ctx.body = { response: 'you can only update your own account' }
    return
  }
  try {
    await profileSchema.validateAsync(ctx.request.body)
    await updateProfileInfo(userId, firstName, lastName, age, gender, city, email, phone)
    ctx.body = { response: "profile information updated" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
}

module.exports = {
  getMyProfile,
  updateMyProfile
};
