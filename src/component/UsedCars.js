import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegStar, FaStar, FaChevronDown, FaChevronRight, FaCar, FaUser, FaGasPump, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const brandsWithModels = [
  {
    name: "maruti suzuki",
    models: [
      { id: "swift", name: "Swift" },
      { id: "tiago", name: "Tiago" },
      { id: "altroz", name: "ALTROZ" },
      { id: "tigor", name: "TIGOR" },
      { id: "punch", name: "PUNCH" },
    ]
  },
  {
    name: "hyundai",
    models: [
      { id: "i20", name: "i20" },
      { id: "venue", name: "Venue" },
      { id: "creta", name: "Creta"},
    ]
  },
  {
    name: "Tata",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Honda",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Renault",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Volkswagen",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Mahindra",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "KIA",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "audi",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Ford",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "MG",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Datsun",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Skoda",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Toyota",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Jeep",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
  {
    name: "Nissan",
    models: [
      { id: "nexon", name: "nexon" },
      { id: "harrier", name: "Harrier" },
      { id: "safari", name: "Safari" },
    ]
  },
];

function fetchCarsData(budget, selectedFilters) {
  return new Promise(async (resolve, reject) => {
    try {
      const filterQuery = selectedFilters.map(f => `${f.brand}:${f.model}`).join(',');
      const response = await fetch(
        `http://3.110.84.64:3000/api/cars/cars?budgetMin=${budget[0]}&budgetMax=${budget[1]}&filters=${filterQuery}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const filteredCars = data
        .filter((car) => {
          const priceInRange = car.price >= budget[0] && car.price <= budget[1];
          
          if (selectedFilters.length === 0) return priceInRange;
          
          return selectedFilters.some(filter => 
            car.brand.toLowerCase() === filter.brand.toLowerCase() && 
            (!filter.model || car.model.toLowerCase() === filter.model.toLowerCase())
          );
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      resolve(filteredCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      reject(error);
    }
  });
}

function UsedCars() {
  const [budget, setBudget] = useState([0, 2500000]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [expandedBrands, setExpandedBrands] = useState({});

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      try {
        const filteredCars = await fetchCarsData(budget, selectedFilters);
        setCars(filteredCars);
      } catch (error) {
        console.error('Error loading cars:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }
  
    loadCars();
  }, [budget, selectedFilters]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    setCartItems(savedCartItems);
  }, []);

  function handleBudgetChange(e) {
    const newBudget = parseInt(e.target.value);
    setBudget([newBudget, 2500000]);
    if (window.innerWidth < 1024) setShowFilters(false);
  }

  function toggleBrand(brandName) {
    setExpandedBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }));
  }

  function toggleFilter(brand, model = '') {
    setSelectedFilters(prev => {
      const filterExists = prev.some(
        f => f.brand === brand && f.model === model
      );

      if (filterExists) {
        return prev.filter(f => !(f.brand === brand && f.model === model));
      } else {
        return [...prev, { brand, model }];
      }
    });

    if (window.innerWidth < 1024) setShowFilters(false);
  }

  function isFilterSelected(brand, model = '') {
    return selectedFilters.some(f => f.brand === brand && f.model === model);
  }

  async function handleAddToCart(carId) {
    try {
      const response = await fetch('http://3.110.84.64:3000/api/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type": 'application/json'
        },
        body: JSON.stringify({ carId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const updatedCart = await response.json();
      const newCartItems = { ...cartItems, [carId]: true };
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  }

  async function handleRemoveFromCart(carId) {
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/cart/remove/${carId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type": 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }

      const updatedCart = await response.json();
      const newCartItems = { ...cartItems, [carId]: false };
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      toast.success('Removed from cart successfully!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart. Please try again.');
    }
  }

  return (
    <div className="container mx-auto mt-10 px-4 mb-20">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden mb-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <motion.div 
          className={`col-span-1 lg:sticky lg:top-20 h-fit bg-white rounded-lg shadow-lg p-6 mt-10 max-h-[calc(100vh-6rem)] overflow-y-auto ${showFilters ? 'block' : 'hidden lg:block'}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Filters</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Budget</h3>
            <input
              type="range"
              min="150000"
              max="2500000"
              step="50000"
              value={budget[0]}
              onChange={handleBudgetChange}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between mt-2 text-sm font-medium text-blue-600">
              <span>₹{(budget[0] / 100000).toFixed(2)}L</span>
              <span>₹{(budget[1] / 100000).toFixed(2)}L</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Brand & Models</h3>
            <div className="space-y-2">
              {brandsWithModels.map((brand) => (
                <div key={brand.name} className="border-b border-gray-200 pb-2">
                  <div className="flex items-center mb-2">
                    <motion.button
                      onClick={() => toggleBrand(brand.name)}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {expandedBrands[brand.name] ? (
                        <FaChevronDown className="w-4 h-4" />
                      ) : (
                        <FaChevronRight className="w-4 h-4" />
                      )}
                    </motion.button>
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        id={brand.name}
                        checked={isFilterSelected(brand.name)}
                        onChange={() => toggleFilter(brand.name)}
                        className="mr-2 form-checkbox text-orange-500 focus:ring-orange-500 h-5 w-5"
                      />
                      <label htmlFor={brand.name} className="text-sm font-medium text-blue-700 cursor-pointer flex-1">
                        {brand.name} 
                      </label>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedBrands[brand.name] && (
                      <motion.div 
                        className="ml-8 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {brand.models.map((model) => (
                          <div key={model.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${brand.name}-${model.id}`}
                              checked={isFilterSelected(brand.name, model.name)}
                              onChange={() => toggleFilter(brand.name, model.name)}
                              className="mr-2 form-checkbox text-orange-500 focus:ring-orange-500 h-4 w-4"
                            />
                            <label
                              htmlFor={`${brand.name}-${model.id}`}
                              className="text-sm text-blue-700 cursor-pointer"
                            >
                              {model.name} 
                            </label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="col-span-1 lg:col-span-3 mt-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No cars found matching your criteria.</p>
              <p className="mt-4 text-gray-500">Try adjusting your filters or budget range.</p>
            </div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {cars.map((car) => (
                <motion.div
                  key={car._id}
                  className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 shadow-md shadow-orange-400"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48">
                    <img
                      src={car?.images?.[0]?.url || "/placeholder.svg"}
                      alt={`${car.brand || "Brand"} ${car.carName || "Car Name"}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => cartItems[car._id] ? handleRemoveFromCart(car._id) : handleAddToCart(car._id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-orange-50 group transition-all duration-300"
                      aria-label={cartItems[car._id] ? "Remove from cart" : "Add to cart"}
                    >
                      <FaShoppingCart className={`h-5 w-5 ${cartItems[car._id] ? 'text-orange-500' : 'text-gray-500'} group-hover:scale-110 transition-transform`} />
                    </motion.button>
                  </div>
      
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-xl text-blue-800">
                      {car.year || "Year"} {car.brand || "Brand"} {car.carName || "Car Name"}
                    </h3>
      
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <FaCar className="h-3 w-3 mr-1" />
                        {car.kilometer} km
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaGasPump className="h-3 w-3 mr-1" />
                        {car.fuelType}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <FaUser className="h-3 w-3 mr-1" />
                        {car.owner}
                      </span>
                    </div>
      
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-500">
                        ₹{car.price ? (car.price / 100000).toFixed(2) : "N/A"}L
                      </div>
                    </div>
      
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-1" />
                        Free Test Drive Available
                      </div>
                      <motion.a
                        href={`/carsdata/${car._id}`}
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
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsedCars;

