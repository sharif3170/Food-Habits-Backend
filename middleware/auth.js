// Auth middleware removed as JWT is no longer used
const authMiddleware = (req, res, next) => {
  // Allow all requests to pass through
  next();
};

export default authMiddleware;
