const Router = require("koa-router");
const router = new Router();
const { verifyAdmin } = require("../authorization");
const { getProfileList, getSearchedProfileList } = require("./controller");

router.get("/api/admin/users/profile", getProfileList);
//router.get("/api/admin/users/profile", getSearchedProfileList);
// router.get("/api/admin/users/profile/:search", verifyAdmin, searchProfileInfos);
// router.put('/api/admin/users/profile', verifyAdmin, updateProfile)
// router.patch("/api/admin/users/:id", verifyAdmin, deleteUser);

module.exports = router;
