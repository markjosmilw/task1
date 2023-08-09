const Router = require("koa-router");
const router = new Router();
const { registerUser, loginUser } = require("./controller");

router.post("/api/user/register", registerUser);
router.post("/api/user/login", loginUser);

module.exports = router;
