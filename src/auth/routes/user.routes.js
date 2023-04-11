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
  freezeUserAccount,
  unfreezeUserAccount,
} = require("../controller/user.controller");
const auth = require("../../middleware/auth");
const { validateRequest, schemas } = require("../../utils/validate");
const roleBasedAccess = require("../../middleware/rbac");

router.post("/signup", validateRequest(schemas.authSchema), createANewUser);
router.post("/login", validateRequest(schemas.authSchema), userLogin);
router.get("/profile", auth, userProfile);
router.get("/statistics", auth, getStatistics);
router.post(
  "/deposit",
  validateRequest(schemas.depositWithdrawalDraftSchema),
  auth,
  depositIntoWallet
);
router.post(
  "/withdraw",
  auth,
  validateRequest(schemas.depositWithdrawalDraftSchema),
  withdrawFromWallet
);
router.get("/stats", auth, getStatistics);
router.post("/transfer", auth, transferMoney);
router.put("/upgrade", auth, upgradeAccount);
router.post(
  "/overdraft",
  auth,
  validateRequest(schemas.depositWithdrawalDraftSchema),
  overdraft
);
router.get("/history", auth, transactionHistory);
router.put(
  "/freeze/:id",
  auth,
  roleBasedAccess(["admin"]),
  freezeUserAccount
);
router.put(
  "/unfreeze/:id",
  auth,
  roleBasedAccess(["admin"]),
  unfreezeUserAccount
);

module.exports = router;
