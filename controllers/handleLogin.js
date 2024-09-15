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
    where: { name: name, father: father, admission: adm_no },
  });
  if (!student)
    return res.json({ status: "error", message: "Invalid Details!" });

  const token = jwt.sign({ student }, jwt_sign);
  return res.json({ token: token });
}

module.exports = { handleLogin };
