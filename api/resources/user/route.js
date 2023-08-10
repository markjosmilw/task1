const userController = require("./controller");

module.exports = ({ router }) => {
  router
    .post("/api/user/register", userController.register)
    .post("/api/user/login", userController.login);
};
