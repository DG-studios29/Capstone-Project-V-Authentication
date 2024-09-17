const roleCheck = (roles) => (req, res, next) => {
    const { role } = req.user;
  
    if (!roles.includes(role)) {
      return res.status(403).send({ error: 'Permission denied' });
    }
  
    next();
  };
  
  module.exports = { roleCheck };
  