const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { handleLogin, checkLogin } = require("../controllers/handleLogin");
require("dotenv").config();

router.post("/login", handleLogin);
router.get("/checklogin", checkLogin);
module.exports = router;
