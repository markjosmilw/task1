const knex = require("./service");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(ctx) {
    const { adminname, password } = ctx.request.body;
    try {
      const admin = await knex.validateAdmin(adminname, password);
      if (!admin) {
        ctx.status = 404;
        ctx.body = { response: "incorrect admin credentials" };
        return;
      }
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          isAdmin: true,
        },
        process.env.SECRET_KEY
      );
      ctx.body = { accessToken: token };
    } catch (error) {
      console.log(error);
    }
  },
  async getUserList(ctx) {
    const { search, page } = ctx.query;
    if (!search) {
      try {
        const users = await knex.fetchUsersByPage(search, page);
        const totalRows = await knex.getUsersTotalRow();
        const pageCount = (totalRows.count - (totalRows.count % 10)) / 10;
        ctx.body = { response: users, pageCount: pageCount };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error };
      }
      return;
    }
    try {
      const users = await knex.fetchUsersByPage(search, page);
      const totalRows = await knex.getUsersTotalRow(search);
      ctx.body = { response: users, pageCount: totalRows };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error };
    }
  },
  async deleteUser(ctx) {
    const userId = ctx.request.params.id;
    try {
      const del = await knex.deleteUserById(userId);
      if (!del) {
        ctx.status = 404;
        ctx.body = { response: "failed to delete user" };
        return;
      }
      ctx.body = { response: "deleted this user succesfully" };
    } catch (error) {
      console.log(error);
    }
  },
};
