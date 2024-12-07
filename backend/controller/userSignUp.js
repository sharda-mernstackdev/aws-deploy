const userModel = require('../model/useModel.js');
const bcrypt = require('bcryptjs');
const cloudinary = require('../cloudinary.js').v2;



async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Validate required fields
    if (!email) throw new Error('Please provide an email');
    if (!password) throw new Error('Please provide a password');
    if (!name) throw new Error('Please provide a name');

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error('Something went wrong while hashing the password');
    }

    // Handle profile picture upload if provided
    let profileUrl = null;
    if (req.file) {
      const uploadToCloudinary = async (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile_pictures' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result.secure_url); // Return the URL of the uploaded image
              }
            }
          );
          stream.end(file.buffer); // Use multer memory storage buffer
        });
      };

      try {
        profileUrl = await uploadToCloudinary(req.file);
      } catch (uploadError) {
        throw new Error('Error uploading profile picture');
      }
    }

    // Prepare the user payload
    const payload = {
      name,
      email,
      password: hashPassword,
      profile: profileUrl, // Save the profile picture URL if available
    };

    // Save the new user to the database
    const newUser = new userModel(payload);
    const savedUser = await newUser.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: 'User created successfully!',
    });
  } catch (error) {
    console.error('Error in userSignUpController:', error.message || error);
    res.status(400).json({
      message: error.message || 'An error occurred',
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
