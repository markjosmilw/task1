const Router = require("koa-router");
const router = new Router();

const {
  regUser,
  logUser,
  deleteUser,
  loginAdmin,
} = require("../controllers/userController");

const { verifyAdmin } = require("../middleware/authorization");

router.post("/api/users/register", regUser);
router.post("/api/users/login", logUser);
router.post("/api/admin/login", loginAdmin);

router.patch("/api/admin/users/:id", verifyAdmin, deleteUser);

module.exports = router;
