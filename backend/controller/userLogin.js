const userModel = require("../model/useModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      // Generate the token
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h", // 8 hours expiration
      });

      // Send the token in the JSON response
      res.status(200).json({
        message: "Login Successful",
        data: { token, userId: user._id },
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userLoginController;
