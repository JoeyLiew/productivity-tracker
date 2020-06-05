const error = (err, _req, res, _next) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: 'failure',
    message,
  });
};

module.exports = error;
