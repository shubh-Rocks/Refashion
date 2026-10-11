const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 400).json({
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;
