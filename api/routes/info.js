const Router = require('koa-router');
const router = new Router();
const { getInfos, postInfo, postContact, updateContact, deleteRow } = require('../controllers/info');

//GET METHOD
router.get('/api/infos', getInfos)

//POST METHODS
router.post('/api/infos', postInfo)
router.post('/api/contact', postContact)

//PUT METHOD
router.put('/api/contact', updateContact)

//DELETE METHOD
router.delete('/api/infos', deleteRow)

module.exports = router;