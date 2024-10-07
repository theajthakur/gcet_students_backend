const Follow = require("../models/follow");
const Student = require("../models/Students");

async function handleRequest(req, res) {
  const user = req.user;
  const follower = user.sr_no;
  const { following } = req.body;

  if (!follower || !following) {
    return res.status(400).json({ error: "Missing Parameters" });
  }

  try {
    const secondUser = await Student.findOne({ where: { sr_no: following } });
    if (!secondUser) {
      return res.status(404).json({ success: false, error: "No User found" });
    }

    const existingRequest = await Follow.findOne({
      where: { followerId: follower, followingId: following },
    });

    if (existingRequest) {
      let message = `Follow request to ${secondUser.name} already exists`;
      if (existingRequest.status) {
        message = `You already follow ${secondUser.name}`;
      }
      return res.status(400).json({ success: false, error: message });
    }

    await Follow.create({ followerId: follower, followingId: following });

    return res.status(200).json({
      success: true,
      message: `Follow request to ${secondUser.name} has been sent successfully!`,
    });
  } catch (error) {
    console.error(
      "Error creating follow request for user:",
      follower,
      "to:",
      following,
      error
    );
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
}

async function handleAccept(req, res) {}
async function handleRemove(req, res) {}

module.exports = { handleAccept, handleRemove, handleRequest };
