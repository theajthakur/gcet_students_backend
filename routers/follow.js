const express = require("express");
const router = express.Router();
const {
  handleAccept,
  handleRemove,
  handleRequest,
  listRequests,
} = require("../controllers/follow");
require("dotenv").config();

router.post("/request", handleRequest);
router.post("/accept/:id", handleAccept);
router.post("/remove/", handleRemove);

router.get("/request", listRequests);

module.exports = router;
