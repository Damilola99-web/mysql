const pool = require("../db/db");

const transactionService = {
  createTransaction: async (
    userId,
    wallet_id,
    amount,
    balance,
    type,
    cashback
  ) => {
    const result = await pool.query(
      "INSERT INTO transaction (user_id, wallet_id, amount, balance, type, cashback) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, wallet_id, amount, balance, type, cashback]
    );
    return result[0];
  },
  getTransactionHistoryWithPaginationAndLimit: async (
    wallet_id,
    page,
    limit
  ) => {
    const result = await pool.query(
      "SELECT * FROM transaction WHERE wallet_id = ? LIMIT ? OFFSET ?",
      [wallet_id, limit, page * limit]
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
