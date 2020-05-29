const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const database = require('../database');

const private = catchAsync(async (req, _res, next) => {
  // Get authorization header.
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError(401, 'Unauthorized access.');
  }
  // Extract access token from authorization header.
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new AppError(401, 'Unauthorized access.');
  }
  // Verify token.
  const { userId, tokenVersion } = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
  // Get user with id and token version.
  const user = await database('users')
    .select()
    .where({ id: userId, token_version: tokenVersion });
  if (user.length === 0) {
    throw new AppError(401, 'Unauthorized access.');
  }
  req.user = user[0];
  next();
});

module.exports = private;
