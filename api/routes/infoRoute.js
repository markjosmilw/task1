const Router = require("koa-router");
const router = new Router();

const {
  getProfileInfos,
  getProfile,
  searchProfileInfos,
  updateProfile,
} = require("../controllers/infoController");

const { verifyUser, verifyAdmin } = require("../middleware/authorization");

router.get("/api/admin/infos/page/:page", getProfileInfos);
router.get("/api/admin/infos/:search", verifyAdmin, searchProfileInfos);
router.put('/api/admin/infos/profile', verifyAdmin, updateProfile)

router.get("/api/infos/profile", verifyUser, getProfile);
router.put("/api/infos/profile", verifyUser, updateProfile);

module.exports = router;
