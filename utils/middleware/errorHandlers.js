const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(err, stack) {
  return config.dev ? { ...err, stack } : err;
}

function logError(err, req, res, next) {
  console.log(err);
  next(err);
}
function wrapError(err, req, res, next) {
  !err.isBoom ? next(next(boom.badImplementation(err))) : next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode || 500);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = { logError, errorHandler, wrapError };
