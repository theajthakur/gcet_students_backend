const express = require("express");
const router = express.Router();
const { fetch_student } = require("../controllers/handleStudent");
router.get("/", fetch_student);

module.exports = router;