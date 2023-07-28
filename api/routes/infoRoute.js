const Router = require("koa-router");
const router = new Router();

const { getAll, updatePersonal, updateContact, getInfos } = require("../controllers/infoController");

router.get("/api/infos", getAll);
router.get("/api/infos/:id", getInfos);
router.post("/api/infos/personal", updatePersonal);
router.post("/api/infos/contact", updateContact);

module.exports = router;
