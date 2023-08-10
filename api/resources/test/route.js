const testController = require("./controller");

module.exports = ({ router }) => {
  router.get("/test", testController.getTest); // corrected route setup
};
