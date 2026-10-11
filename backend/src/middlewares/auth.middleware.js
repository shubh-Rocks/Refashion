export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "please login first " });
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
