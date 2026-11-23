const {
  INTERNAL_SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
} = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);

  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR ? SERVER_ERROR_MESSAGE : message,
  });
};

module.exports = errorHandler;
