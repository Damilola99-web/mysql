
require('dotenv').config();

exports.configService = {
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME ,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    jwtSecret: 'iuyertyuio',
    jwtExpire: '1h',
    jwtCookieExpire: 1,
    jwtSecure: false,
    jwtCookieSame: 'none',
    jwtHttpOnly: true,
};

