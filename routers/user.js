const express = require("express");
const router = express.Router();
const { showProfile, updateProfile } = require("../controllers/handleUser");
require("dotenv").config();

// Router for Logged in User at /user
router.post("/profile", updateProfile);
router.get("/profile", showProfile);

module.exports = router;
