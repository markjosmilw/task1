const profileController = require("./controller");
const authorization = require("../authorization");

module.exports = ({ router }) => {
  router
    .get(
      "/api/user/profile",
      authorization.verifyUser,
      profileController.getProfile
    )
    .put("/api/user//profile", profileController.updateProfile);
};
