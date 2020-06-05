const catchAsync = require('../utilities/catchAsync');
const { tasks } = require('../services');

exports.create = catchAsync(async (req, res, _next) => {
  const formData = {
    ...req.body,
    user_id: req.user.id,
  };
  const { status, data, error } = await tasks.create(formData);
  if (status === 'success') {
    res.status(201).json({
      status,
      data,
    });
  } else {
    res.status(200).json({
      status,
      error,
    });
  }
});

exports.read = catchAsync(async (req, res, _next) => {
  const { status, data, error } = await tasks.read({
    user_id: req.user.id,
    ...req.body,
  });
  if (status === 'success') {
    res.status(200).json({
      status,
      data,
    });
  } else {
    res.status(200).json({
      status,
      error,
    });
  }
});

exports.update = catchAsync(async (req, res, _next) => {
  const { status, data, error } = await tasks.update(
    req.params.task_id,
    req.user.id,
    req.body
  );
  if (status === 'success') {
    res.status(200).json({
      status,
      data,
    });
  } else {
    res.status(200).json({
      status,
      error,
    });
  }
});

exports.delete = catchAsync(async (req, res, _next) => {
  const { status, message, error } = tasks.delete(
    req.body.tasksId,
    req.user.id
  );
  if (status === 'success') {
    res.status(200).json({
      status,
      message,
    });
  } else {
    res.status(200).json({
      status,
      error,
    });
  }
});
