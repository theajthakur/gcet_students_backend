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

async function handleAccept(req, res) {
  try {
    const reqId = parseInt(req.params.id);
    const user = req.user;
    const followRequest = await Follow.findOne({
      where: { id: reqId, followingId: user.sr_no, status: 0 },
    });

    if (!followRequest) {
      return res.status(404).json({ error: "No such follow request exists!" });
    }

    const [updated] = await Follow.update(
      { status: 1 },
      { where: { id: reqId } }
    );

    if (updated) {
      return res
        .status(200)
        .json({ status: "success", message: "Request accepted successfully!" });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Failed to accept the request. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error while accepting follow request:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while processing your request.",
    });
  }
}
async function handleRemove(req, res) {
  const user = req.user;
  const follower = user.sr_no;
  const { following } = req.body;

  // Validate input
  if (!follower || !following) {
    return res.status(400).json({ error: "Missing Parameters" });
  }

  try {
    // Check if the follow relationship exists
    const existingFollow = await Follow.findOne({
      where: { followerId: follower, followingId: following },
    });

    if (!existingFollow) {
      return res
        .status(404)
        .json({ success: false, error: "Not Following This User" });
    }

    // Remove the follow relationship
    await Follow.destroy({
      where: { followerId: follower, followingId: following },
    });

    return res.status(200).json({
      success: true,
      message: existingFollow.status
        ? "Unfollowed successfully!"
        : "Follow Request Deleted!",
    });
  } catch (error) {
    console.error("Error during unfollowing:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
}

async function listRequests(req, res) {
  const user = req.user;
  const requests = await Follow.findAll({
    where: { followingId: user.sr_no, status: 0 },
    include: [
      {
        model: Student,
        as: "follower",
        attributes: ["name"],
      },
    ],
  });

  if (!requests) return res.json({ error: "No Pending Request!" });
  return res.json(requests);
}

module.exports = { handleAccept, handleRemove, handleRequest, listRequests };
