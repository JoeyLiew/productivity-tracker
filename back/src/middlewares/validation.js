const Joi = require('@hapi/joi');

const validate = (schema, prop) => (req, res, next) => {
  let { error } = schema.validate(req[prop], { abortEarly: false });
  if (!error) {
    return next();
  }
  error = error.details.reduce((acc, curr) => {
    acc[curr.path[0]] = curr.message;
    return acc;
  }, {});
  res.status(422).json({
    status: 'failure',
    error,
  });
};

const schemas = {
  register: Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
  }),
  refreshToken: Joi.object({
    rft: Joi.string().required(),
  }),
  taskId: Joi.object({
    task_id: Joi.number().required(),
  }),
  taskCreate: Joi.object({
    description: Joi.string().required(),
  }),
};

module.exports = {
  validate,
  schemas,
};
