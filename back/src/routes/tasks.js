const { tasks } = require('../controllers');
const { Router } = require('express');
const { schemas, validate } = require('../middlewares/validation');
const private = require('../middlewares/private');

const router = Router();

router.use(private);
router
  .route('/')
  .post(validate(schemas.taskCreate, 'body'), tasks.create)
  .delete(tasks.delete);
router.post('/get', tasks.read);
router.patch('/:task_id', validate(schemas.taskId, 'params'), tasks.update);

module.exports = router;
