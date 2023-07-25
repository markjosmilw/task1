const Router = require('koa-router');
const { getInfos, postInfo, postContact, updateContact } = require('../controllers/info');
const router = new Router();

//GET METHOD
router.get('/api/infos', getInfos)

//POST METHODS
router.post('/api/infos', postInfo)
router.post('/api/contact', postContact)
router.put('/api/contact', updateContact)

module.exports = router;