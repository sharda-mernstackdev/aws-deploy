const TestDrive = require ('../model/testDrive')

const createTestDrive = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    
    const newTestDrive = new TestDrive({
      ...req.body,
      author: req.user._id, // Assign author from authenticated user
    });

    // Save the new test drive
    const savedTestDrive = await newTestDrive.save();

    res.status(201).json(savedTestDrive); // Respond with the saved document
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};


const getTestDrives = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { author: req.user._id }; // Fetch only test drives for the logged-in user

    if (status) {
      query.status = status; // Optionally filter by status
    }

    const testDrives = await TestDrive.find(query);
    res.status(200).json(testDrives);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


 const getTestDriveById = async (req, res) => {
  try {
    const testDrive = await TestDrive.findById(req.params.id);
    if (!testDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }
    res.status(200).json(testDrive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const updateTestDrive = async (req, res) => {
  try {
    const updatedTestDrive = await TestDrive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTestDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }
    res.status(200).json(updatedTestDrive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const cancelTestDrive = async (req, res) => {
  try {
    const testDrive = await TestDrive.findById(req.params.id);
    if (!testDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }
    
    if (testDrive.status === 'cancelled') {
      return res.status(400).json({ message: 'Test drive is already cancelled' });
    }
    
    testDrive.status = 'cancelled';
    await testDrive.save();
    
    res.status(200).json({ message: 'Test drive cancelled successfully', testDrive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const deleteTestDrive = async (req, res) => {
  try {
    const deletedTestDrive = await TestDrive.findByIdAndDelete(req.params.id);
    if (!deletedTestDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }
    res.status(200).json({ message: 'Test drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createTestDrive, getTestDrives,getTestDriveById, updateTestDrive, cancelTestDrive, deleteTestDrive  }
