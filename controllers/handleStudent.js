async function fetch_student(req, res) {
  return res.status(200).json(req.params);
}

module.exports = { fetch_student };
