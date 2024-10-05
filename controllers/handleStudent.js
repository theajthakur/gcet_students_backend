const Student = require("../models/Students");
const { Op } = require("sequelize");

async function fetch_student(req, res) {
  const { query, type } = req.query;
  if (!query || !type)
    return res.status(400).json({ error: "Require all fields!" });
  try {
    if (type == "name") {
      if (query.length < 4) return;
      const students = await Student.findAll({
        where: {
          name: {
            [Op.like]: `${query}%`, // This will search for names that contain the query
          },
        },
      });
      if (!students) return res.staus("404").json({ error: "Nothing Found!" });
      // const filteredStudent = {
      //   sr_no: student.class_sr,
      //   name: student.name,
      //   father: student.father_name,
      //   branch: student.branch,
      //   section: student.section,
      //   admission: student.adm_no,
      //   roll_no: student.tmp_roll,
      // };

      return res.status(200).json(students);
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
    return res.status(400).json({ error: "Invalid Request", detail: error });
  }
}

module.exports = { fetch_student };
