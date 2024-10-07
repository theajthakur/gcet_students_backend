const express = require("express");
const router = express.Router();
const { fetch_student, student_profile } = require("../controllers/students");
router.get("/", fetch_student);
router.get("/:id", student_profile);

module.exports = router;
