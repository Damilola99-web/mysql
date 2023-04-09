const pool = require("../../db/db");
const bcrypt = require("bcrypt");

const userService = {
  createUser: async (email, password) => {
    // const [result] = await pool.query(
    //   "INSERT INTO users (email, password) VALUES (?, ?) ",
    //   [email, hashedPassword]
    // );

    // return result; // 1

    const res = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?) ",
      [email, password]
    );
    const result = res[0];
    return result; // 1
  },
  findUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return result[0]; // [{}]
  },
  findByEmail: async (email) => {
    // const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    //   email,
    // ]);
    // console.log(result);
    // return result[0]
    const res = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const res1 = res[0];
    const result = res1[0]; // const result = res[0][0];
    return result;
  },
  findAllUsers: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result[0];
  },
  updateUser: async (id, email, password) => {
    const result = await pool.query(
      "UPDATE users SET email = ?, password = ? WHERE id = ?",
      [email, password, id]
    );
    return result[0];
  },
  deleteUser: async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result[0];
  },
  upgradeAccount: async (id) => {
    const result = await pool.query(
      "UPDATE users SET is_premium = 1 WHERE id = ?",
      [id]
    );
    return result[0];
  },
};

module.exports = userService;
