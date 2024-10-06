const express = require("express");
const router = express.Router();
const Students = require("../models/Students");
require("dotenv").config();

router.post("/profile", async (req, res) => {
  const { mobile, email } = req.body;
  if (!mobile || !email) return res.end("Invalid Request!");
  const user = req.user;
  try {
    await Students.update(
      { email: email, mobile: mobile },
      { where: { sr_no: user.sr_no, adm_no: user.adm_no } }
    );
    res.json({ status: "updated!" });
  } catch (error) {
    res.json({ error: error });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const user = req.user;
    const profile = await Students.findOne({ where: { sr_no: user.sr_no } });
    res.json(profile);
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;