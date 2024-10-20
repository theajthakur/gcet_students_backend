const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

async function getProfilePicture(req, res) {
  const { w, h } = req.query;
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
      if (w && h) {
        sharp(userImagePath)
          .resize({ width: parseInt(w), height: parseInt(h) })
          .toBuffer()
          .then((data) => {
            console.log("Image resized successfully"); // Add this log
            res.type("image/jpeg");
            res.send(data);
          })
          .catch((error) => {
            console.error("Image processing error:", error);
            res.status(500).send("Error processing image");
          });
      } else {
        return res.sendFile(userImagePath);
      }
    } else {
      if (w && h) {
        sharp(defaultImagePath)
          .resize({ width: parseInt(w), height: parseInt(h) })
          .toBuffer()
          .then((data) => {
            res.type("image/jpeg");
            res.send(data);
          })
          .catch((error) => {
            console.error("Image processing error:", error);
            res.status(500).send("Error processing image");
          });
      } else {
        return res.sendFile(defaultImagePath);
      }
    }
  });
}

module.exports = { getProfilePicture };
