const jwt = require('jsonwebtoken');

const createToken = (payload, secret, duration) => {
  return jwt.sign(payload, secret, {
    expiresIn: duration,
  });
};

module.exports = createToken;
