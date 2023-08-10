const adminController = require("./controller");
const authorization = require("../authorization");

module.exports = ({ router }) => {
  router
    .post("/api/admin/login", adminController.login)
    .get(
      "/api/admin/users/profile",

      adminController.getUserList
    )
    .patch(
      "/api/admin/users/:id",
      authorization.verifyAdmin,
      adminController.deleteUser
    );
};
