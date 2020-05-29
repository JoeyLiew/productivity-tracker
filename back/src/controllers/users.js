const catchAsync = require('../utilities/catchAsync');
const { users } = require('../services');

exports.register = catchAsync(async (req, res, _next) => {
  const {
    status,
    user,
    accessToken,
    refreshToken,
    message,
  } = await users.register(req.body);
  if (status === 'success') {
    // Set refresh token as cookie.
    res.cookie('rft', refreshToken);
    res.status(201).json({
      status,
      data: {
        user,
        accessToken,
      },
    });
  } else {
    res.status(200).json({
      status,
      message,
    });
  }
});

exports.login = catchAsync(async (req, res, _next) => {
  const {
    status,
    user,
    accessToken,
    refreshToken,
    message,
  } = await users.login(req.body);
  if (status === 'success') {
    // Set refresh token as cookie.
    res.cookie('rft', refreshToken);
    res.status(200).json({
      status,
      data: {
        user,
        accessToken,
      },
    });
  } else {
    res.status(200).json({
      status,
      message,
    });
  }
});

exports.logout = (_req, res) => {
  res.clearCookie('rft');
  res.status(200).json({
    status: 'success',
    message: {
      general: 'User successfully logout.',
    },
  });
};

exports.refresh_token = catchAsync(async (req, res, _next) => {
  const { rft } = req.cookies;
  const { status, data, message } = await users.refreshToken(rft);
  if (status === 'success') {
    res.status(200).json({
      status,
      data,
    });
  } else {
    res.status(200).json({
      status,
      message,
    });
  }
});

exports.load_session = catchAsync(async (req, res, _next) => {
  const { rft } = req.cookies;
  const { status, data, message } = users.loadSession(rft);
  if (status === 'success') {
    res.status(200).json({
      status,
      data,
    });
  } else {
    res.status(200).json({
      status,
      message,
    });
  }
});
