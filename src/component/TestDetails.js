import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, FaChevronRight, FaCar, FaGasPump, 
  FaTachometerAlt, FaUser, FaMoneyBillWave, FaCalendarAlt,
  FaClock, FaEnvelope, FaPhone, FaTimes, FaTrashAlt, FaCheck, FaEdit
} from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";

function TestDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carData, setCarData] = useState({});
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  // Fetch test drive data
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(`http://3.110.84.64:3000/api/testDrive/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again");
          }
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  // Fetch car data based on carId from test drive data
  useEffect(() => {
    async function fetchCarData(carId) {
      if (!carId || (typeof carId === "object" && !carId.$oid)) {
        console.error("Invalid carId:", carId);
        setError("Invalid car ID");
        setLoading(false);
        return;
      }

      const carIdString = typeof carId === "object" ? carId.$oid : carId;
      const url = `http://3.110.84.64:3000/api/cars/cars/${carIdString}`;
      console.log("Fetching car data from:", url);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.warn(`Car with id ${carIdString} not found`);
            setError("Car not found");
          } else {
            throw new Error(`Failed to fetch car data, status: ${response.status}`);
          }
          setCarData(null);
          return;
        }

        const carResult = await response.json();
        setCarData(carResult);
      } catch (err) {
        console.error("Error fetching car data:", err.message);
        setError(err.message);
      }
    }

    if (data?.carId) {
      fetchCarData(data.carId);
    }
  }, [data?.carId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const bookingData = {
    car: {
      carName: carData.carName || "N/A",
      brand: carData.brand || "N/A",
      kilometer: carData.kilometer || 0,
      petrol: carData.fuelType === "Petrol",
      diesel: carData.fuelType === "Diesel",
      owner: carData.owner || "N/A",
      price: carData.price || 0,
      images: carData.images || [{ url: "/placeholder.svg?height=400&width=600" }],
    },
    customer: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      message: data.message,
      status: data.status,
    },
  };

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const period = Number(hours) >= 12 ? 'PM' : 'AM';
    const formattedHours = Number(hours) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }

  function nextImage() {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % bookingData.car.images.length
    );
  }

  function prevImage() {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + bookingData.car.images.length) % bookingData.car.images.length
    );
  }

  async function handleCancel() {
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/testDrive/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error Details:', errorDetails);
        throw new Error(`Error: ${response.status} - ${errorDetails.message}`);
      }
      navigate('/testdriveStatus');
    } catch (err) {
      console.error('Error handling cancel:', err.message);
    }
  }

  function handleDelete() {
    setIsDeleteModalOpen(true);
  }

  async function confirmDelete() {
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/testDrive/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error Details:', errorDetails);
        throw new Error(`Error: ${response.status} - ${errorDetails.message}`);
      }
      navigate('/testdriveStatus');
    } catch (err) {
      console.error('Error handling delete:', err.message);
    }
    setIsDeleteModalOpen(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleUpdate() {
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/testDrive/update/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error Details:', errorDetails);
        throw new Error(`Error: ${response.status} - ${errorDetails.message}`);
      }
      setIsEditing(false);
      alert("Booking updated successfully!");
    } catch (err) {
      console.error('Error handling update:', err.message);
      alert("Failed to update booking. Please try again.");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Test Drive Booking Details
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <h2 className="text-xl font-semibold p-4 border-b">Vehicle Images</h2>
            <div className="relative h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={bookingData.car.images[currentImageIndex].url}
                  alt={`${bookingData.car.brand} ${bookingData.car.carName}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bookingData.car.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white scale-125' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Car Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Vehicle Details</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  {bookingData.car.brand.toUpperCase()} {bookingData.car.carName}
                </h3>
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(bookingData.car.price)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaCar className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-semibold">{bookingData.car.brand.toUpperCase()}</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaTachometerAlt className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Kilometers</p>
                    <p className="font-semibold">{bookingData.car.kilometer.toLocaleString()} km</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaGasPump className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold">
                      {bookingData.car.petrol ? "Petrol" : bookingData.car.diesel ? "Diesel" : "Electric"}
                    </p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Owner</p>
                    <p className="font-semibold">{bookingData.car.owner}</p>
                  </div>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
              >
                <FaEdit className="mr-2" />
                Update Booking
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Customer Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Customer Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(bookingData.customer).map(([key, value]) => (
              <motion.div key={key} whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {key === 'name' && <FaUser className="text-orange-500 text-xl" />}
                  {key === 'email' && <FaEnvelope className="text-orange-500 text-xl" />}
                  {key === 'phone' && <FaPhone className="text-orange-500 text-xl" />}
                  {key === 'date' && <FaCalendarAlt className="text-orange-500 text-xl" />}
                  {key === 'time' && <FaClock className="text-orange-500 text-xl" />}
                  {key === 'status' && (
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 font-semibold">
                        {value.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  {isEditing && key !== 'status' ? (
                    <input
                      type={key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    <p className="font-semibold">
                      {key === 'date' ? formatDate(value) : 
                       key === 'time' ? formatTime(value) : 
                       value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Save Changes
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-end space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center"
          >
            <FaTimes className="mr-2" />
            Cancel Booking
          </motion.button>
          {status && <p>{status}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
          >
            <FaTrashAlt className="mr-2" />
            Delete Booking
          </motion.button>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-96"
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TestDetails;

