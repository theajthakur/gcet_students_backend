const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { handleLogin } = require("../controllers/handleLogin");
require("dotenv").config();

router.post("/login", handleLogin);
router.get("/checklogin", (req, res) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ status: "error", message: "unauthorised" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json({ status: "error", message: err });
    return res.json({
      status: "success",
      message: `${user.name} is verified!`,
    });
  });
});
module.exports = router;
