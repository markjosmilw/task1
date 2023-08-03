const Router = require("koa-router");
const router = new Router();

const {
  regUser,
  logUser,
  deleteUser,
  isAuthorized,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

router.post("/api/users/register", regUser);
router.post("/api/users/login", logUser);

router.patch("/api/users/:id", deleteUser);

router.post("/api/jwt", auth, isAuthorized); 

module.exports = router;
