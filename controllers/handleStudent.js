const Student = require("../models/Students");

async function fetch_student(req, res) {
  const { query, type } = req.query;
  if (!query || !type)
    return res.status(400).json({ error: "Require all fields!" });
  try {
    if (type == "name") {
      const student = await Student.findOne({ where: { name: query } });
      if (!student) return res.staus("404").json({ error: "Nothing Found!" });
      return res.status(200).json(student);
    } else if (type == "admission") {
      const student = await Student.findOne({ where: { admission: query } });
      if (!student) return res.staus("404").json({ error: "Nothing Found!" });
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ error: "Nothing Found!!" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Request" });
  }
}

module.exports = { fetch_student };
