const express = require("express");
const router = express.Router();

const {
  createANewUser,
  userLogin,
  userProfile,
  getStatistics,
  depositIntoWallet,
  withdrawFromWallet,
  transferMoney,
  upgradeAccount,
  overdraft,
  transactionHistory,
} = require("../controller/user.controller");
const auth = require("../../middleware/auth");

router.post("/signup", createANewUser);
router.post("/login", userLogin);
router.get("/profile", auth, userProfile);
router.get("/statistics", auth, getStatistics);
router.post("/deposit", auth, depositIntoWallet);
router.post("/withdraw", auth, withdrawFromWallet);
router.get("/stats", auth, getStatistics);
router.post("/transfer", auth, transferMoney);
router.put("/upgrade", auth, upgradeAccount);
router.post("/overdraft", auth, overdraft);
router.get("/history", auth, transactionHistory);


module.exports = router;
