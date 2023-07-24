const Router = require('koa-router');
const { getInfos, postInfo, postContact, updateContact } = require('../controllers/info');
const router = new Router();

router.get('/test', (ctx) => ctx.body = "test ok")

//GET ROUTE
router.get('/api/infos', getInfos)

//POST ROUTES
router.post('/api/infos', postInfo)
router.post('/api/contact', postContact)

//PUT ROUTE
router.put('/api/contact', updateContact)

module.exports = router;