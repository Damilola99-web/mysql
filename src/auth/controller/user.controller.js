const {
  comparePassword,
  hashedPassword,
} = require("../../helper/comparepassword");
const { generateToken, setTokenCookie } = require("../../helper/jwt");
const redisClient = require("../../helper/redisconnection");
const wrap = require("../../helper/wrapper");
const {
  createUser,
  findUserById,
  findByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
} = require("../service/user.service");
const logger = require("../../log/logger");
const {
  createWallet,
  depositIntoWallet,
  checkIfWalletBelongsToUser,
} = require("../../wallet/service/wallet.service");
const { createTransaction } = require("../../transaction/transaction.service");

exports.createANewUser = wrap(async (req, res) => {
  let { email, password } = req.body;
  const foundUser = await findByEmail(email);
  if (foundUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  password = await hashedPassword(password);
  const newUser = await createUser(email, password); // 1
  const createdUser = await findUserById(newUser.insertId);
  await createWallet(createdUser[0].id, createdUser[0].email);
  return res.status(201).json(createdUser[0]);
});

exports.userLogin = wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = await generateToken({ id: user.id, email: user.email });
  setTokenCookie(res, token);
  return res.status(200).json({ token });
});

// Get user profile route using redis cache
exports.userProfile = wrap(async (req, res) => {
  const { id } = req.user;
  // Check if user exists in Redis cache by id
  redisClient.get(`user:${id}`, async (error, cachedUser) => {
    if (error) throw error;

    if (cachedUser) {
      console.log("*******************************");
      console.log("i am in redis cache");
      console.log("*******************************");
      // If user exists in Redis cache, return user
      const user = JSON.parse(cachedUser);
      return res.status(200).json(user[0]);
    } else {
      console.log("============================");
      console.log("i am in postgresql");
      console.log("============================");
      // If user does not exist in Redis cache, get user from MySQL
      const user = await findUserById(id);
      // Set user in Redis cache
      await redisClient.setex(`user:${id}`, 10, JSON.stringify(user)); // 10 seconds
      return res.status(200).json(user[0]);
    }
  });
});

// get statistics all users route using redis cache
exports.getStatistics = wrap(async (req, res) => {
  // Check if users exists in Redis cache
  redisClient.get("users", async (error, cachedUsers) => {
    if (error) throw error;

    if (cachedUsers) {
      console.log("*******************************");
      console.log("i am in redis cache");
      console.log("*******************************");
      // If users exists in Redis cache, return users
      const users = JSON.parse(cachedUsers);
      const totalUsers = users.length;
      return res.status(200).json({ users, totalUsers });
    } else {
      console.log("============================");
      console.log("i am in postgresql");
      console.log("============================");
      // If users does not exist in Redis cache, get users from MySQL
      const users = await findAllUsers();
      const totalUsers = users.length;
      // Set users in Redis cache
      await redisClient.setex("users", 10, JSON.stringify(users)); // 10 seconds
      return res.status(200).json({ users, totalUsers });
    }
  });
});

// update user profile route
exports.updateUserProfile = wrap(async (req, res) => {
  const { id } = req.user;
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (user) return res.status(409).json({ message: "User already exists" });
  const hashedPassword = await hashedPassword(password);
  const updatedUser = await updateUser(id, email, hashedPassword);
  return res.status(200).json(updatedUser);
});

// delete user profile route
exports.deleteUserProfile = wrap(async (req, res) => {
  const { id } = req.user;
  const deletedUser = await deleteUser(id);
  return res.status(200).json(deletedUser);
});

// deposit into wallet route
exports.depositIntoWallet = wrap(async (req, res) => {
  const { id } = req.user;
  const { amount } = req.body;
  let user = await findUserById(id);
  const wallet = await checkIfWalletBelongsToUser(id, user[0].email);
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });
  const amountToNumber = +amount;
  const deposit = await depositIntoWallet(id, amountToNumber);
  let newBalance = wallet[0].balance + amountToNumber;
  await createTransaction(
    id,
    wallet[0].id,
    amountToNumber,
    newBalance,
    "deposit"
  );

  return res.status(200).json({
    message: `Deposit successful of USD${amount}`,
    deposit: deposit[0],
  });
});

// withdraw from wallet route
exports.withdrawFromWallet = wrap(async (req, res) => {
  const { id } = req.user;
  const { amount } = req.body;
  let user = await findUserById(id);
  const wallet = await checkIfWalletBelongsToUser(id, user[0].email);
  if (!wallet) return res.status(404).json({ message: "Wallet not found" });
  const amountToNumber = +amount;
  if (amountToNumber > wallet[0].balance)
    return res.status(400).json({ message: "Insufficient funds" });
  const newBalance = wallet[0].balance - amountToNumber;
  await createTransaction(
    id,
    wallet[0].id,
    amountToNumber,
    newBalance,
    "withdraw"
  );
  return res.status(200).json({
    message: `Withdrawal successful of USD${amount}`,
    newBalance,
  });
});