const Router = require("koa-router");
const router = new Router();

const { getAll, updatePersonal, updateContact } = require("../controllers/infoController");

router.get("/api/infos", getAll);
router.post("/api/infos/personal", updatePersonal);
router.post("/api/infos/contact", updateContact);

module.exports = router;
