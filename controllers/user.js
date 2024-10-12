const Students = require("../models/Students");

async function updateProfile(req, res) {
  // Update Profile of Logged in User
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
}

async function showProfile(req, res) {
  // Return Profile of Logged in USER
  try {
    const user = req.user;
    const profile = await Students.findOne({ where: { sr_no: user.sr_no } });
    return res.status(200).json(profile);
  } catch (error) {
    res.json({ error: error });
  }
}

module.exports = { showProfile, updateProfile };
