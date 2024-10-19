const Students = require("../models/Students");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function updateProfile(req, res) {
  const { mobile, email } = req.body;
  if (!mobile || !email) return res.end("Invalid Request!");
  const user = req.user;
  try {
    await Students.update(
      { email: email, mobile: mobile },
      { where: { sr_no: user.sr_no, adm_no: user.adm_no } }
    );
    res.json({ status: "updated!" });
  } catch (error) {
    res.json({ error: error });
  }
}

const getProfilePicture = (req, res) => {
  const userImagePath = path.join(
    __dirname,
    "../../client/public/image/profile_pic/",
    `${req.user.sr_no}.png`
  );
  const defaultImagePath = path.join(
    __dirname,
    "../../client/public/image/profile_pic/user.png"
  );

  // Check if user-specific image exists
  fs.access(userImagePath, fs.constants.F_OK, (err) => {
    if (!err) {
      return res.sendFile(userImagePath);
    } else {
      return res.sendFile(defaultImagePath);
    }
  });
};
const updateProfilePicture = async (req, res) => {
  const { imageData } = req.body;
  if (!imageData || !imageData.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid image data." });
  }

  try {
    // Split the base64 data to remove the metadata
    const base64Data = imageData.split(",")[1];
    if (!base64Data) {
      return res.status(400).json({ error: "Invalid base64 data." });
    }

    const buffer = Buffer.from(base64Data, "base64");
    const image = sharp(buffer);
    const { width, height } = await image.metadata();

    // Define output path
    const outputDir = path.join(
      __dirname,
      "../../client/public/image/profile_pic/"
    );
    const outputFileName = `user_${req.user.adm_no}.png`;
    const outputPath = path.join(outputDir, outputFileName);

    // Crop or upload the image
    if (width === height) {
      await image.toFile(outputPath);
      console.log("Image uploaded successfully!");
    } else {
      const length = Math.min(width, height);
      const top = parseInt((height - length) / 2);
      const left = parseInt((width - length) / 2);

      await image
        .extract({ width: length, height: length, left, top })
        .toFile(outputPath);
      console.log("Image cropped and uploaded successfully!");
    }

    // Resize if necessary
    const resizedImage = sharp(outputPath);
    const resizedMetadata = await resizedImage.metadata();

    if (resizedMetadata.width > 1000 || resizedMetadata.height > 1000) {
      await resizedImage.resize(1000, 1000).toFile(outputPath);
      console.log("Image resized successfully!");
    }

    return res
      .status(200)
      .json({ message: "Profile picture uploaded successfully." });
  } catch (error) {
    console.error("Error processing the image:", error);
    return res.status(500).json({ error: "Error processing the image." });
  }
};

async function showProfile(req, res) {
  // Return Profile of Logged in USER
  try {
    const user = req.user;
    const profile = await Students.findOne({ where: { sr_no: user.sr_no } });
    return res.status(200).json(profile);
  } catch (error) {
    res.json({ error: error });
  }
}

module.exports = {
  showProfile,
  updateProfile,
  updateProfilePicture,
  getProfilePicture,
};
