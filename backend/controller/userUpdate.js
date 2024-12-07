const cloudinary = require('../cloudinary'); // Ensure correct import
const User = require('../model/useModel'); // Import the User model

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate the user making the request
    if (!req.user || req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }

    // Ensure there's data to update
    if (!req.body && !req.file) {
      return res.status(400).json({ message: 'No data provided to update' });
    }

    let updateData = { ...req.body };

    // Handle profile picture upload if a new picture is provided
    if (req.file) {
      const uploadToCloudinary = async (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile_pictures', public_id: `user_${userId}`, overwrite: true },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result.secure_url); // Return the secure URL of the uploaded picture
              }
            }
          );
          stream.end(file.buffer); // Use multer memory storage buffer
        });
      };

      try {
        // Upload the new profile picture to Cloudinary
        const profilePictureUrl = await uploadToCloudinary(req.file);
        updateData.profile = profilePictureUrl; // Add the uploaded URL to the update data
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        return res.status(500).json({ message: 'Error uploading profile picture' });
      }
    }

    // Update the user's data in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user data
    res.status(200).json({
      message: 'User updated successfully',
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in updateUser controller:', error);
    res.status(500).json({
      message: 'Error updating user',
      success: false,
      error: error.message,
    });
  }
};

module.exports = updateUser;
