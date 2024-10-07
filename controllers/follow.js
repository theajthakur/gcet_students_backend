const Follow = require("../models/follow");

async function handleRequest(req, res) {
  const user = req.user;
  const follower = user.sr_no;
  const { following } = req.body;

  if (!follower || !following) {
    return res.status(400).json({ error: "Missing Parameters" });
  }

  try {
    await Follow.create({ followerId: follower, followingId: following });

    return res.status(200).json({
      success: true,
      message: "Follow request sent successfully!",
    });
  } catch (error) {
    console.error("Error creating follow request:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
}

async function handleAccept(req, res) {}
async function handleRemove(req, res) {}

module.exports = { handleAccept, handleRemove, handleRequest };
