const Router = require('koa-router');
const router = new Router();

const { regUser, logUser } = require('../controllers/authController');

router.post('/api/auth/register', regUser)
router.post('/api/auth/login', logUser)

module.exports = router;