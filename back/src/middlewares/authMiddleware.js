const hasRole = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    const decodedToken = jwt.verify(token.split(' ')[1], 'yourSecretKey');
    const userRole = decodedToken.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Access Denied' });
  }
};

module.exports = hasRole;
