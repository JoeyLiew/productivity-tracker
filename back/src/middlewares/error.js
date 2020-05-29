const error = (err, _req, res, _next) => {
  const { statusCode, message } = err;
  console.log('Working Error');
  res.status(statusCode).json({
    status: 'failure',
    message,
  });
};

module.exports = error;
