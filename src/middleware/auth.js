const jwt = require('jsonwebtoken');
const { configService } = require("../config/config");

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Auth Error 🔒🔒🔒🔒🔒" });

  try {
      const decoded = jwt.verify(token, configService.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("something wrong with auth middleware" + err);
    res.status(500).json({ message: "Server Error 🔥🔥🔥🔥🔥🔥" });
  }
};

module.exports = auth;