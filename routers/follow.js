const express = require("express");
const router = express.Router();
const {
  handleRequestManage,
  handleRemove,
  handleRequest,
  listRequests,
} = require("../controllers/follow");
require("dotenv").config();

router.post("/request", handleRequest);
router.post("/:type/:id", handleRequestManage);
router.post("/remove/", handleRemove);

router.get("/request", listRequests);

module.exports = router;
