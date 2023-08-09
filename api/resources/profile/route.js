const Router = require("koa-router");
const router = new Router();
const { getMyProfile, updateMyProfile } = require("./controller");
const { verifyUser } = require("../authorization");

router.get("/api/user/profile", verifyUser, getMyProfile);
router.put("/api/user/profile", verifyUser, updateMyProfile);

module.exports = router;
