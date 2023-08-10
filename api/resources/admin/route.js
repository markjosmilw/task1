//router.get("/api/admin/users/profile", getSearchedProfileList);
// router.get("/api/admin/users/profile/:search", verifyAdmin, searchProfileInfos);
// router.put('/api/admin/users/profile', verifyAdmin, updateProfile)
// router.patch("/api/admin/users/:id", verifyAdmin, deleteUser);

const Router = require("koa-router");
const router = new Router();
const { verifyAdmin } = require("../authorization");
const { getProfileList, deleteUser } = require("./controller");

router.get("/api/admin/users/profile", getProfileList);
router.patch("/api/admin/users/:id", deleteUser);

module.exports = router;

// module.exports = ({ router }) =>
//   router
//     .prefix("/info")

//     .get("/", infoController.get) // get

