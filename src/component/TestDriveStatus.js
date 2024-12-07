'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TestDriveStatus() {
  const [testDriveData, setTestDriveData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [carData, setCarData] = useState({})

  const fetchCarsData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://3.110.84.64:3000/api/testdrive/get',{
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type" : 'application/json'
      },
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setTestDriveData(data)
      setError(null)
      return data
    } catch (error) {
      console.error('Error fetching test drive data:', error)
      setError('Failed to fetch test drive data. Please try again later.')
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCarById = async (carId) => {
    if (!carId || (typeof carId === 'object' && !carId.$oid)) {
      console.error("Invalid carId:", carId);
      return null;
    }
  
    const carIdString = typeof carId === 'object' ? carId.$oid : carId;
    const url = `http://3.110.84.64:3000/api/cars/cars/${carIdString}`;
    console.log('Fetching car data from:', url);
  
    try {
      const response = await fetch(url, {
        method: 'GET', // Specify the HTTP method
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`Car with id ${carIdString} not found`);
          return null;
        }
        throw new Error(`Failed to fetch car data, status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching car data:', error.message);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchAllData = async () => {
      const testDrives = await fetchCarsData();
      const carDataPromises = testDrives.map(drive => 
        drive.carId ? fetchCarById(drive.carId) : Promise.resolve(null)
      );
      const carDataResults = await Promise.all(carDataPromises);
      
      const carDataMap = {};
      carDataResults.forEach((car, index) => {
        if (car && testDrives[index].carId) {
          const carIdString = typeof testDrives[index].carId === 'object' 
            ? testDrives[index].carId.$oid 
            : testDrives[index].carId;
          carDataMap[carIdString] = car;
        }
      });
      
      setCarData(carDataMap);
    };

    fetchAllData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <Calendar className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'scheduled':
        return {
          icon: 'text-orange-500',
          text: 'text-orange-700',
          bg: 'bg-orange-100',
          border: 'border-l-orange-500'
        }
      case 'completed':
        return {
          icon: 'text-blue-500',
          text: 'text-blue-700',
          bg: 'bg-blue-100',
          border: 'border-l-blue-500'
        }
      case 'cancelled':
        return {
          icon: 'text-red-500',
          text: 'text-red-700',
          bg: 'bg-red-100',
          border: 'border-l-red-500'
        }
      default:
        return {
          icon: 'text-gray-500',
          text: 'text-gray-700',
          bg: 'bg-gray-100',
          border: 'border-l-gray-500'
        }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50">
        <motion.div 
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-3 border-orange-200" />
          <motion.div 
            className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 p-4"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <p className="text-gray-800 text-base mb-4">{error}</p>
          <motion.button 
            onClick={fetchCarsData}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retry
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
        <motion.div 
          layout
          className="max-w-7xl mx-auto space-y-6"
        >
          <motion.div 
            className="text-center space-y-2 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-500">
              Test Drive Status 
            </h1>
            <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-blue-500 opacity-80" />
          </motion.div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {testDriveData.map((drive, index) => {
                const carIdString = typeof drive.carId === 'object' ? drive.carId.$oid : drive.carId;
                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group"
                  >
                    <motion.div 
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative h-48">
                        <motion.img
                          src={carData[carIdString]?.images?.[0]?.url || '/default-image.jpg'}
                          alt={carData[carIdString]?.name || 'Car Image'}
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                        />
                      </div>
                      <Link to={ `/testDrive-details/${drive?._id}`}>
                        <motion.div className="p-4">
                          <motion.h2 
                            className="text-lg font-semibold text-gray-900 mb-3 truncate"
                          >
                            {carData[carIdString]?.carName || 'Car Name Not Available'}
                          </motion.h2>

                          <motion.div 
                            className={`b-4 py-2 px-3 rounded-lg ${getStatusStyle(drive.status).bg} border-l-4 ${getStatusStyle(drive.status).border}`}
                          >
                            <motion.span className={`flex items-center gap-2 text-sm font-medium ${getStatusStyle(drive.status).text}`}>
                              <span className={getStatusStyle(drive.status).icon}>
                                {getStatusIcon(drive.status)}
                              </span>
                              {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                            </motion.span>
                          </motion.div>

                          <motion.div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span className="text-sm font-medium text-orange-700">
                                {formatDate(drive.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-blue-700">
                                {drive.time}
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </LayoutGroup>
  )
}