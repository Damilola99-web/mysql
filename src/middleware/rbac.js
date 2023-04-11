const roleBasedAccess = (roles) => {
  return function (req, res, next) {
    if (roles.includes(req.user.roles)) {
      console.log("roles", roles);
      next();
    } else {
      return res.json({ message: "Permission Denied, Admin rights only" });
    }
  };
};

module.exports = roleBasedAccess;
