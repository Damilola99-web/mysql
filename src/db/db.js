const { configService } = require("../config/config");
const mysql = require("mysql2");
const logger = require("../log/logger");

const pool = mysql.createConnection({
  host: configService.dbHost,
  user: configService.dbUser,
  password: configService.dbPassword,
  database: configService.dbName,
  port: configService.dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
});

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;

  // console.log("The solution is: ", results[0].solution);
  logger.info("Database connected successfully 🚀🚀");
})

// connection.end();

module.exports = pool.promise();
