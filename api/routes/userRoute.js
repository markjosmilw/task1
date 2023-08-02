const Router = require("koa-router");
const router = new Router();

const { regUser, logUser, isAuthorized } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/api/auth/register", regUser);
router.post("/api/auth/login", logUser);

router.post("/api/jwt", auth, isAuthorized);

module.exports = router;
