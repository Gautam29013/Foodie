// Middleware for handling 404 (Not Found)
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Centralized error handling middleware
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Catch Mongoose bad ObjectId format
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
  }

  // Catch Mongoose duplicate key error
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
