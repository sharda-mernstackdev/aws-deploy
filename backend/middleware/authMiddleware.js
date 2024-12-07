


const jwt = require('jsonwebtoken');
const User = require('../model/useModel');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ message: "Authentication required", error: true, success: false });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: "Invalid token format", error: true, success: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: "Invalid token payload", error: true, success: false });
    }

    const user = await User.findOne({ email: decoded.email }).select('-password');

    if (!user) {
      return res.status(401).json({ message: "User not found", error: true, success: false });
    }

    req.user = user;
    req.userId = user._id; // Ensure userId is set here
    req.token = token;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Please Login", error: true, success: false });
    }
    res.status(500).json({ message: "Internal server error", error: true, success: false });
  }
};

module.exports = authMiddleware;
