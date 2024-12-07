const Car = require('../model/carModel');
const cloudinary = require('../cloudinary'); // Make sure this path is correct

const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: 1 }); // Ascending order by 'createdAt'
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car' });
  }
};



const createCar = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const imageUrls = [];

    // Function to upload a file buffer to Cloudinary
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve({
                name: file.originalname,
                url: result.secure_url,
              });
            }
          }
        );
        stream.end(file.buffer); // Send the buffer to Cloudinary
      });
    };

    // Upload each file and store its URL
    for (const file of req.files) {
      try {
        const uploadResult = await uploadToCloudinary(file);
        imageUrls.push(uploadResult);
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
      }
    }

    // Create a new Car instance with image URLs
    const newCar = new Car({
      ...req.body,
      author: req.user._id,
      images: imageUrls,
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created successfully ",
      success: true,
      car: newCar,
    });
  } catch (error) {
    console.error("Error in createCar controller:", error);
    res.status(500).json({ message: 'Error creating car with images' });
  }
};





const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: 'Error updating car' });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car' });
  }
};

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };