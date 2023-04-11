const mysql = require("mysql2");
const { configService } = require("./config/config");
const logger = require("./log/logger");

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

// Delete all tables if they exist
const dropUsersTable = `DROP TABLE IF EXISTS users;`;
const dropWalletTable = `DROP TABLE IF EXISTS wallet;`;
const dropTransactionTable = `DROP TABLE IF EXISTS transaction;`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  password VARCHAR(255) NOT NULL,
  roles VARCHAR(255) NOT NULL DEFAULT 'user' COMMENT 'user, admin',
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

`;

const createTransactionTable = `
CREATE TABLE IF NOT EXISTS transaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  wallet_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(255) NOT NULL,
  balance DECIMAL(10, 2) NOT NULL,
  cashback DECIMAL(10, 2) NOT NULL DEFAULT 0, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (wallet_id) REFERENCES wallet(id)
);

`;

const createWalletTable = `
CREATE TABLE IF NOT EXISTS wallet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  wallet_owner VARCHAR(255) NOT NULL UNIQUE,
  balance DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

`;

//use promise with pool

pool.promise();

// drop tables
pool.query(dropTransactionTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("transaction table dropped");
});

pool.query(dropWalletTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("wallet table dropped");
});

pool.query(dropUsersTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("users table dropped");
});

pool.query(createUsersTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("users table created");
});

pool.query(createWalletTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("wallet table created");
});

pool.query(createTransactionTable, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("transaction table created");
});

// end the connection
pool.end();
