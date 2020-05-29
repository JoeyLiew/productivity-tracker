const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');
const createToken = require('../utilities/createToken');

exports.register = async (formData) => {
  const { name, email, password } = formData;
  // Check if email is already taken.
  const user = await database('users').select().where({ email });
  if (user.length > 0) {
    return {
      status: 'failure',
      message: {
        email: 'Email is already registered.',
      },
    };
  }
  // Encrypt password.
  const hashedPassword = await bcrypt.hash(password, 12);
  // Create new user in database.
  const newUser = await database('users').insert(
    { name, email, password: hashedPassword },
    '*'
  );
  // Payload for token creation.
  const payload = {
    userId: newUser[0].id,
    tokenVersion: newUser[0].token_version,
  };
  // Create refresh token.
  const refreshToken = createToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_DURATION
  );
  // Create access token.
  const accessToken = createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_DURATION
  );
  // Omit password from user object.
  const { password: omit, ...rest } = newUser[0];
  return {
    status: 'success',
    user: rest,
    refreshToken,
    accessToken,
  };
};

exports.login = async (formData) => {
  const { email, password } = formData;
  // Get user with email.
  const user = await database('users').select().where({ email });
  if (user.length === 0) {
    return {
      status: 'failure',
      message: {
        general: 'Invalid credentials.',
      },
    };
  }
  // Compare passwords.
  const match = await bcrypt.compare(password, user[0].password);
  if (!match) {
    return {
      status: 'failure',
      message: {
        general: 'Invalid credentials.',
      },
    };
  }
  // Payload for token creation.
  const payload = {
    userId: user[0].id,
    tokenVersion: user[0].token_version,
  };
  // Create refresh token.
  const refreshToken = createToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_DURATION
  );
  // Create access token.
  const accessToken = createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_DURATION
  );
  const { password: omit, ...rest } = user[0];
  return {
    status: 'success',
    user: rest,
    refreshToken,
    accessToken,
  };
};

exports.refreshToken = async (refreshToken) => {
  // Verify refresh token.
  const { userId, tokenVersion } = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  // Check refresh token version.
  const user = await database('users')
    .select()
    .where({ id: userId, token_version: tokenVersion });
  if (user.length === 0) {
    return {
      status: 'failure',
      message: {
        general: 'Invalid refresh token.',
      },
    };
  }
  // Create new access token.
  const payload = { userId: user[0].id, tokenVersion: user[0].token_version };
  const accessToken = createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_DURATION
  );
  return {
    status: 'success',
    data: {
      accessToken,
    },
  };
};

exports.loadSession = async (refreshToken) => {
  // Get user info from refresh token.
  const { userId, tokenVersion } = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await database('users')
    .select()
    .where({ id: userId, token_version: tokenVersion });
  if (user.length === 0) {
    return {
      status: 'failure',
      message: {
        general: 'Invalid refresh token.',
      },
    };
  }
  return {
    status: 'success',
    data: {
      user,
    },
  };
};
