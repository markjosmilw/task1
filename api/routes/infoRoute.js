const Router = require("koa-router");
const router = new Router();

const {
  getAll,
  updatePersonal,
  updateContact,
  getInfos,
  getPersonal,
} = require("../controllers/infoController");

const { verifyUser } = require("../middleware/authorization");

//with middleware for admin
// router.get("/api/infos", getAll);
// router.get("/api/infos/:id", getInfos);
router.put("/api/admin/infos/personal", updatePersonal);
router.put("/api/admin/infos/contact", updateContact);

//with middleware for user
router.get("/api/infos/personal", verifyUser, getPersonal);
router.put('/api/infos/personal/:id', verifyUser, updatePersonal)
router.put('/api/infos/contact/:id', verifyUser, updateContact)

module.exports = router;
