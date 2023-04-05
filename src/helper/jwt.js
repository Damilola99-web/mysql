const jwt = require("jsonwebtoken");
const { configService } = require("../config/config");



const jwtService = {
  generateToken: (payload) => {
    // payload as parameter
    const token = jwt.sign(payload, configService.jwtSecret, { expiresIn: configService.jwtExpire });
    return token;
  },
  verifyToken: (token) => {
    const payload = jwt.verify(token, configService.jwtSecret);
    return payload;
  },
  // extract res.cookie
  extractToken: (req) => {
    const token = req.cookies.token;
    return token;
  },
  setCookie: (res, name, value, options = {}) => {
    res.cookie(name, value, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      ...options,
    });
  },
};

module.exports = jwtService;
