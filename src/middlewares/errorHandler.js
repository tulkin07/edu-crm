export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' });
  }

  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}`,
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }

  if (err.message === 'Validation error') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors,
    });
  }

  if (err.name === 'PrismaClientInitializationError') {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Check DATABASE_URL in backend/.env and ensure PostgreSQL is running.',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Something went wrong';

  return res.status(statusCode).json({ success: false, message });
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};
