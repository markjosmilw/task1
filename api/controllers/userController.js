const jwt = require("jsonwebtoken");
//helpers
const {
  findUserByUsername,
  createNewUser,
  deleteUserById,
} = require("../helpers/knexService");
const { joiUserSchema } = require("../helpers/joiService");
const { validatePassword } = require("../helpers/bcryptService");

//new update using knexService, joi
const regUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    await joiUserSchema(ctx.request.body);
    const user = await findUserByUsername(username);
    if (user) {
      ctx.status = 403;
      ctx.body = { error: "this username has already exist" };
      return;
    }
    await createNewUser(username, password);
    ctx.body = { response: "registration successful" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.code
      ? { error: error.sqlMessage }
      : { error: error.details[0].message };
  }
};

const logUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "this user does not exist" };
      return;
    }
    const pwMatched = await validatePassword(password, user.password);
    if (!pwMatched) {
      ctx.status = 403;
      ctx.body = { error: "incorrect password" };
      return;
    }
    const { id, ...others } = user;
    //const token = jwt.sign(id, process.env.SECRET_KEY);
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

const deleteUser = async (ctx) => {
  const id = ctx.request.params.id;
  try {
    const res = await deleteUserById(id);
    if (!res) {
      ctx.status = 404;
      ctx.body = { error: "this user does not exist" };
      return;
    }
    ctx.body = { response: "deleted this user successfully" };
  } catch (error) {
    console.log(error);
  }
};

const isAuthorized = async (ctx) => {
  const user = ctx.request.user;
  ctx.body = user;
};

module.exports = {
  regUser,
  logUser,
  deleteUser,
  isAuthorized,
};
