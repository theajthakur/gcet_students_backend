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
  console.log(imageData);
  if (!imageData || !imageData.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid image data." });
  }

  try {
    // Extract metadata and base64 data
    const [metadata, base64Data] = imageData.split(",");
    const imageType = metadata.match(/:(.*?);/)[1]; // Extract image type (e.g., "image/png")

    // Decode base64 data
    const buffer = Buffer.from(base64Data, "base64");
    const image = sharp(buffer);
    const { width, height } = await image.metadata();

    // Check if the image is square
    if (width !== height) {
      return res.status(400).json({ error: "Image must be square." });
    }

    // Set the output directory and file name
    const outputDir = path.join(
      __dirname,
      "../../client/public/image/profile_pic/"
    );
    const outputFileName = `user_${req.user.adm_no}.png`; // Use image format from metadata
    const outputPath = path.join(outputDir, outputFileName);

    // Resize if necessary and save the image
    if (width > 1000 || height > 1000) {
      await image.resize(1000, 1000).toFile(outputPath);
    } else {
      await image.toFile(outputPath);
    }

    return res
      .status(200)
      .json({ message: "Profile picture uploaded successfully." });
  } catch (error) {
    console.error("Error processing the image:", error); // Log the error
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
