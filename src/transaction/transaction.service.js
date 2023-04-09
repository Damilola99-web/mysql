const pool = require("../db/db");

const transactionService = {
  createTransaction: async (userId, wallet_id, amount, balance, type) => {
    const result = await pool.query(
      "INSERT INTO transaction (user_id, wallet_id, amount, balance, type) VALUES (?, ?, ?, ?, ?)",
      [userId, wallet_id, amount, balance, type]
    );
    return result[0];
  },
  getTransactionHistory: async (userId) => {
    const result = await pool.query(
      "SELECT * FROM transaction WHERE user_id = ?",
      [userId]
    );
    return result[0];
  },
  getTransactionHistoryByWalletId: async (wallet_id) => {
    const result = await pool.query(
      "SELECT * FROM transaction WHERE wallet_id = ?",
      [wallet_id]
    );
    return result[0];
  },
};

module.exports = transactionService;
