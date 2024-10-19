const path = require("path");
const fs = require("fs");

async function getProfilePicture(req, res) {
  const adm_no = req.params.adm_no;
  const userImagePath = path.join(
    __dirname,
    "../../client/public/image/profile_pic/",
    `user_${adm_no}.png`
  );
  const defaultImagePath = path.join(
    __dirname,
    "../../client/public/image/profile_pic/user.jpg"
  );

  fs.access(userImagePath, fs.constants.F_OK, (err) => {
    if (!err) {
      return res.sendFile(userImagePath);
    } else {
      console.log(userImagePath);
      return res.sendFile(defaultImagePath);
    }
  });
}

module.exports = { getProfilePicture };
