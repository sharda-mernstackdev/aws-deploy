const userModel = require('../model/useModel');

async function userDetailsController(req, res) {
  try {
    console.log("userId", req.user._id); // Changed from req._id to req.user._id
    const user = await userModel.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details retrieved successfully"
    });

    console.log("user", user);

  } catch (err) {
    res.status(400).json({
      message: err.message || "Error retrieving user details",
      error: true,
      success: false
    });
  }
}

module.exports = userDetailsController;