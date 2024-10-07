const express = require("express");
const router = express.Router();
const {
  handleAccept,
  handleRemove,
  handleRequest,
} = require("../controllers/follow");
require("dotenv").config();

router.post("/request", handleRequest);
router.post("/accept/:id", handleAccept);
router.post("/remove/", handleRemove);

module.exports = router;
