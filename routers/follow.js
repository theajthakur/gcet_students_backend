const express = require("express");
const router = express.Router();
const {
  handleAccept,
  handleRemove,
  handleRequest,
} = require("../controllers/follow");
require("dotenv").config();

router.post("/follow/request/:id", handleRequest);
router.post("/follow/accept/:id", handleAccept);
router.post("/follow/remove/:id", handleRemove);

module.exports = router;
