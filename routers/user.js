const express = require("express");
const router = express.Router();
const {
  showProfile,
  updateProfile,
  updateProfilePicture,
  getProfilePicture,
} = require("../controllers/user");
require("dotenv").config();

router.post("/profile", updateProfile);
router.post("/profile/picture", updateProfilePicture);
router.get("/profile/picture", getProfilePicture);
router.get("/profile", showProfile);

module.exports = router;
