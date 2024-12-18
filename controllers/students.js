const Student = require("../models/Students");
const Follow = require("../models/follow");
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

async function student_profile(req, res) {
  let id = req.params.id;
  if (typeof id == "string" && !/^\d+$/.test(id)) {
    const tmpuser = await Student.findOne({ where: { adm_no: id } });
    if (!tmpuser) return res.send("Invalid Request!");
    id = tmpuser.sr_no;
  }
  try {
    // Fetch the student's profile based on the provided ID
    const student = await Student.findOne({ where: { sr_no: id } });

    // If the student does not exist, return a 404 error
    if (!student) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found." });
    }

    // Check if the current user is following the student
    const followS = await Follow.findOne({
      where: { followerId: req.user.sr_no, followingId: id },
    });

    const followers = await Follow.findAll({
      where: { followingId: id, status: 1 },
      include: [
        {
          model: Student,
          as: "follower",
          attributes: ["name", "profile_pic", "adm_no"],
        },
      ],
    });
    let followSs = "nofollow";
    if (followS) {
      followSs = followS.status ? "follow" : "requested";
    }

    // Create a new object that includes the student's data and follow status
    const response = {
      ...student.dataValues, // Use dataValues to get plain object representation
      follow: followSs, // Set follow to true if the user follows the student
      self: parseInt(req.user.sr_no) === parseInt(id),
      verified:
        student.mobile && student.email && student.profile_pic ? true : false,
      followCount: followers.length,
      followers: followers,
    };

    // Return the response with follow status
    return res.json({ success: true, student: response });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
}

module.exports = { fetch_student, student_profile };
