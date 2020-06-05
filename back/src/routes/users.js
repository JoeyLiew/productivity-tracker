const cookieParser = require('cookie-parser');
const { Router } = require('express');
const { users } = require('../controllers');
const { schemas, validate } = require('../middlewares/validation');
const private = require('../middlewares/private');

const router = Router();

router.post('/register', validate(schemas.register, 'body'), users.register);
router.post('/login', validate(schemas.login, 'body'), users.login);
router.get('/logout', users.logout);
router.get(
  '/refresh_token',
  validate(schemas.refreshToken, 'cookies'),
  cookieParser(),
  users.refresh_token
);
router.get('/load_session', private, users.load_session);

module.exports = router;
