const Router = require('koa-router');
const { getInfos, postInfo, postContact } = require('../controllers/info');
const router = new Router();

//GET METHODS
router.get('/test', (ctx) => ctx.body = "test ok")
router.get('/api/infos', getInfos)

//POST METHODS
router.post('/api/infos', postInfo)
router.post('/api/contact', postContact)

module.exports = router;