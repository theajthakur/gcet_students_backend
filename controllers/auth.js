const Student = require("../models/Students");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_sign = process.env.JWT_SECRET;

async function handleLogin(req, res) {
  const { name, father, adm_no } = req.body;
  if (!name || !father || !adm_no)
    return res.json({
      status: "error",
      message: "All arguments are required!",
    });
  const student = await Student.findOne({
    where: { adm_no: adm_no },
  });
  if (!student)
    return res.json({ status: "error", message: "Invalid Details!" });

  if (student.name.toUpperCase() != name.toUpperCase())
    return res.status(400).json({
      status: "error",
      message: "name not matching with corresponding Admission Number",
    });

  if (student.name.toUpperCase() != name.toUpperCase())
    return res.status(400).json({
      status: "error",
      message: "Name not matching with corresponding Admission Number",
    });

  if (student.father_name.toUpperCase() != father.toUpperCase())
    return res.status(400).json({
      status: "error",
      message: "Father Name not matching with corresponding Admission Number",
    });

  const student_client = {
    sr_no: student.sr_no,
    branch_sr: student.branch_sr,
    class_sr: student.class_sr,
    branch: student.branch,
    section: student.section,
    tmp_roll: student.tmp_roll,
    adm_no: student.adm_no,
    name: student.name,
    father_name: student.father_name,
    profile_pic: student.profile_pic,
    email: student.email,
    mobile: student.mobile,
  };
  const token = jwt.sign(student_client, jwt_sign);
  return res.json({ token: token });
}

async function checkLogin(req, res) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ status: "error", message: "unauthorised" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json({ status: "error", message: err });
    return res.json({
      status: "success",
      message: `${user.name} is verified!`,
      user,
    });
  });
}

module.exports = { handleLogin, checkLogin };
