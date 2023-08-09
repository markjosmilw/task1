const jwt = require("jsonwebtoken");
const Joi = require("joi");
const random = require("random-name");

const { createNewUser, validateUser } = require("./service");

const registerSchema = Joi.object({
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(5),
  firstName: Joi.string().required().min(2),
  lastName: Joi.string().required().min(2),
});

const registerUser = async (ctx) => {
  const { username, password, firstName, lastName } = ctx.request.body;
  try {
    await registerSchema.validateAsync(ctx.request.body);
    const err = await createNewUser(username, password, firstName, lastName);
    if (err) {
      ctx.status = 403;
      ctx.body = { error: err.error };
      return;
    }
    ctx.body = { response: "registration successful" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const loginUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await validateUser(username, password);
    if (user.error) {
      ctx.status = 404;
      ctx.body = user.error;
      return;
    }
    const { id, ...others } = user;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: id,
      },
      process.env.SECRET_KEY
    );
    ctx.body = { accessToken: token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
