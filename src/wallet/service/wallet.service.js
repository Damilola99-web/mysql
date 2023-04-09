const pool = require("../../db/db");

const walletService = {
  depositIntoWallet: async (userId, amount) => {
    const result = await pool.query(
      "UPDATE wallet SET balance = balance + ? WHERE user_id = ?",
      [amount, userId]
    );
    return result[0];
  },
  withdrawFromWallet: async (userId, amount) => {
    const result = await pool.query(
      "UPDATE wallet SET balance = balance - ? WHERE user_id = ?",
      [amount, userId]
    );
    return result[0];
  },
  getWalletBalance: async (userId) => {
    const result = await pool.query(
      "SELECT balance FROM wallet WHERE user_id = ?",
      [userId]
    );
    return result[0];
  },
  createWallet: async (userId, wallet_owner) => {
    const result = await pool.query(
      "INSERT INTO wallet (user_id, balance, wallet_owner) VALUES (?, ?,?)",
      [userId, 0, wallet_owner]
    );
    return result[0];
  },
  checkIfWalletBelongsToUser: async (userId, wallet_owner) => {
    const result = await pool.query(
      "SELECT * FROM wallet WHERE user_id = ? AND wallet_owner = ?",
      [userId, wallet_owner]
    );
    return result[0];
  },
};

module.exports = walletService;
