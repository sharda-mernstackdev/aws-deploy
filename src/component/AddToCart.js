import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaCar, FaGasPump, FaUser, FaChevronRight, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function fetchCartData() {
  return fetch('http://3.110.84.64:3000/api/cart', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cart details');
      }
      return response.json();
    })
    .then(data => data.items || [])
    .catch(error => {
      console.error('Error fetching cart details:', error);
      return [];
    });
}

function handleRemoveFromCart(carId, setCartItems) {
  return fetch(`http://3.110.84.64:3000/api/cart/remove/${carId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      return response.json();
    })
    .then(() => {
      setCartItems(prevItems => prevItems.filter(item => item.car._id !== carId));
    })
    .catch(error => {
      console.error('Error removing item from cart:', error);
    });
}

function CarItem(props) {
  const { item, onRemove } = props;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
    >
      <div className="relative h-48">
        <img
          src={item.car.images[0]?.url || "/placeholder.svg"}
          alt={`${item.car.brand} ${item.car.carName}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.car._id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 group transition-all duration-300"
          aria-label="Remove from saved cars"
        >
          <FaShoppingCart className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-lg text-blue-800">
          {item.car.year} {item.car.brand} {item.car.carName}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaCar className="h-3 w-3 mr-1" />
            {item.car.kilometer} km
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaGasPump className="h-3 w-3 mr-1" />
            {item.car.fuelType}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <FaUser className="h-3 w-3 mr-1" />
            {item.car.owner}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">
            ₹{item.car.price ? (item.car.price / 100000).toFixed(2) : 'N/A'}L
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-1" />
            Free Test Drive Available
          </div>
          <motion.a
            href={`/carsdata/${item.car._id}`}
            className="block w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center font-medium group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details
            <FaChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      try {
        const items = await fetchCartData();
        setCartItems(items);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const filteredItems = cartItems.filter(item =>
    item.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.car.carName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Saved Cars</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {filteredItems.length} {filteredItems.length === 1 ? 'car' : 'cars'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No saved cars found</h2>
          <p className="text-gray-600 mb-4">Try adjusting your search or explore more cars</p>
          <Link
            to="/usedcars"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Explore Cars
          </Link>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <CarItem
                key={item.car._id}
                item={item}
                onRemove={(carId) => handleRemoveFromCart(carId, setCartItems)}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default AddToCart;
