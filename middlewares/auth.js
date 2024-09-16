const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  if (
    req.path === "/login" ||
    req.path === "/public" ||
    req.path === "/checklogin"
  )
    return next();

  const token = req.header("Authorization");
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
