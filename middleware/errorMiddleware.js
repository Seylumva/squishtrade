class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  const { message = "Something went wrong.", statusCode = 500 } = err;
  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

module.exports = {
  AppError,
  errorMiddleware,
};
