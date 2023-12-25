const AppError = require('../utils/appErrors');

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = err.errors[0]
  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const duplicateFieldName = err.keyValue ? Object.keys(err.keyValue)[0] : '';
  const message = `Duplicate field value: ${duplicateFieldName}, Please use another value`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
  new AppError("Invalid token, please login again", 401);

const handleTokenExpiredError = () =>
  new AppError("Token has expired, please login again", 401);


const sendDevErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    stack: err.stack,
    message: err.message,
    error: err,
  });
};

const sendProdErr = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: "error",
      message: "Something went very wrong",
      error: err,
    });
  }
};


// Centralized error handling middleware.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err))
    error.message = err.message
    if (error.name === "CastError") error = handleCastError(error);
    if (error.message === 'Validation failed') error = handleValidationError(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError(error);
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError(error);

    sendProdErr(error, res);
  }
};