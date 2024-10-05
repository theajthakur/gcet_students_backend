const Student = require("../models/Students");

async function fetch_student(req, res) {
  const { query, type } = req.query;
  if (!query || !type)
    return res.status(400).json({ error: "Require all fields!" });
  try {
    if (type == "name") {
      const student = await Student.findOne({ where: { name: query } });
      if (!student) return res.staus("404").json({ error: "Nothing Found!" });
      const filteredStudent = {
        sr_no: student.class_sr,
        name: student.name,
        father: student.father_name,
        branch: student.brach,
        section: student.section,
        admission: student.adm_no,
        roll_no: student.adm_no,
      };

      return res.status(200).json(filteredStudent);
    } else if (type == "admission") {
      const student = await Student.findOne({ where: { admission: query } });
      if (!student) return res.staus("404").json({ error: "Nothing Found!" });
      const filteredStudent = {
        sr_no: student.sr_no,
        name: student.name,
        father: student.father,
        program: student.program,
        admission: student.admission,
      };

      return res.status(200).json(filteredStudent);
    } else {
      return res.status(404).json({ error: "Nothing Found!!" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Request" });
  }
}

module.exports = { fetch_student };
