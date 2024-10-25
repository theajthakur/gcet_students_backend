const express = require("express");
const router = express.Router();
const {
  showProfile,
  updateProfile,
  updateProfilePicture,
  getProfilePicture,
} = require("../controllers/user");
require("dotenv").config();

router.post("/profile", updateProfile);
router.post("/profile/picture", updateProfilePicture);
router.get("/profile/picture", getProfilePicture);
router.get("/profile", showProfile);

router.post("/publish/post", (req, res) => {
  const data = {
    user: {
      adm_no: req.user.adm_no,
      name: req.user.name,
    },
    post: {
      id: Math.random(3) * 10000,
      date_uploaded: "29 August",
      description: req.body.caption,
    },
    interaction: {
      likes: 0,
      liked: false,
      comments: [],
    },
  };
  return res.json(data);
});

module.exports = router;
