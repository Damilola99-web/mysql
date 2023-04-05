const express = require("express");
const router = express.Router();

const { createANewUser, userLogin } = require("../controller/user.controller");

router.post("/signup", createANewUser);
router.post("/login", userLogin);

module.exports = router;
