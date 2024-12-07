const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.js');
const path = require('path');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const TestDriveRoutes = require('./routes/testDriveRoutes.js');
const newCarRoutes = require('./routes/newCarRoutes.js');
const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Define allowed origins (you can include both localhost and public IP for production)
const allowedOrigins = ['http://localhost:3001', 'http://3.110.84.64:3000','http://3.110.84.64','http://3.110.84.64:3001'];

// CORS middleware with dynamic origin handling
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true // Allow cookies and credentials
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the build folder (if using React for frontend)
app.use(express.static(path.join(__dirname, "../build")));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/testDrive', TestDriveRoutes);
app.use('/api/newCars', newCarRoutes);

// Catch-all route to serve the frontend (for SPAs like React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
