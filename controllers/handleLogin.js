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
    where: { admission: adm_no },
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

  if (student.father.toUpperCase() != father.toUpperCase())
    return res.status(400).json({
      status: "error",
      message: "Father Name not matching with corresponding Admission Number",
    });

  const student_client = {
    sr_no: student.sr_no,
    name: student.name,
    father: student.father,
    admission: student.admission,
  };
  const token = jwt.sign(student_client, jwt_sign);
  return res.json({ token: token });
}

module.exports = { handleLogin };
