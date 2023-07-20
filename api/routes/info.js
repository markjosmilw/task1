const Router = require('koa-router');
const { getInfos, postInfo, postContact, getBasicInfos, findContact } = require('../controllers/info');
const router = new Router();

router.get('/test', (ctx) => ctx.body = "test ok")

//GET METHOD/S
router.get('/api/infos', getInfos)
router.get('/api/basic', getBasicInfos)
router.get('/api/contact/:userId', findContact)

//POST METHODS
router.post('/api/infos', postInfo)
router.post('/api/contact', postContact)

module.exports = router;