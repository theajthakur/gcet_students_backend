const express = require("express");
const router = express.Router();
const { getProfilePicture } = require("../controllers/static");
router.get("/profile/picture/:adm_no", getProfilePicture);

module.exports = router;
