const express = require("express");
const router = express.Router();

const {
  createANewUser,
  userLogin,
  userProfile,
  getStatistics,
  depositIntoWallet,
  withdrawFromWallet,
} = require("../controller/user.controller");
const auth = require("../../middleware/auth");

router.post("/signup", createANewUser);
router.post("/login", userLogin);
router.get("/profile", auth, userProfile);
router.get("/statistics", auth, getStatistics);
router.post("/deposit", auth, depositIntoWallet);
router.post("/withdraw", auth, withdrawFromWallet);


module.exports = router;
