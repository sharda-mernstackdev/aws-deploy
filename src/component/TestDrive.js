import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { CalendarIcon, ClockIcon, CarIcon, UserIcon, PhoneIcon, MailIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, Loader2Icon, FuelIcon, MilestoneIcon, UsersIcon, PaletteIcon, DollarSignIcon, MapPinIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}) {
  return (
    <div className="text-center p-6 bg-red-100 border border-red-400 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800">Oops! Something went wrong.</h2>
      <p className="text-red-600">{error.message}</p>
    </div>
  )
}

function TestDrive() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    carModel: '',
    carId: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [carFeatures, setCarFeatures] = useState(null);
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const params = useParams();
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0, 300], [0, 1, 0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/cars/cars/${params?.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car details');
      }

      const dataResponse = await response.json();
      console.log('API Response:', dataResponse);

      setData(dataResponse);
      setFormData((prevData) => ({
        ...prevData,
        carId: dataResponse?._id ?? '',
        carModel: dataResponse?.carName ?? '',
      }));
    } catch (error) {
      console.error('Error fetching car details:', error);
      setError('Failed to load car details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCarFeatures = async () => {
    setLoadingFeatures(true);
    try {
      const response = await fetch(`http://3.110.84.64:3000/api/cars/cars/${params?.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car features');
      }

      const dataResponse = await response.json();
      console.log('Features API Response:', dataResponse);

      const features = [
        { icon: <CarIcon className="w-6 h-6" />, text: `Model: ${dataResponse?.carName ?? 'N/A'} ${dataResponse.brand}` },
        // { icon: <CalendarIcon className="w-6 h-6" />, `text: Year: ${dataResponse?.year ?? 'N/A'}` },
        { icon: <FuelIcon className="w-6 h-6" />, text: `Fuel Type: ${dataResponse?.fuelType ?? 'N/A'} `},
        { icon: <MilestoneIcon className="w-6 h-6" />, text: `kilometer: ${dataResponse?.kilometer ?? 'N/A'} km` },
        // { icon: <UsersIcon className="w-6 h-6" />, text: Seats: ${dataResponse?.seats ?? 'N/A'} },
        // { icon: <PaletteIcon className="w-6 h-6" />, text: Color: ${dataResponse?.color ?? 'N/A'} },
        { icon: <DollarSignIcon className="w-6 h-6" />, text: `Price: ₹${dataResponse?.price?.toLocaleString() ?? 'N/A'}` },
        // { icon: <MapPinIcon className="w-6 h-6" />, text: Location: ${dataResponse?.location ?? 'N/A'} },
      ];

      setCarFeatures(features);
    } catch (error) {
      console.error('Error fetching car features:', error);
      setError('Failed to load car features. Please try again later.');
    } finally {
      setLoadingFeatures(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [params?.id]);

  const handleShowFeatures = () => {
    if (!showFeatures) {
      fetchCarFeatures();
    }
    setShowFeatures(!showFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://3.110.84.64:3000/api/testDrive/create', {
        method: 'POST',
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "content-type" : 'application/json'
      },
        body: JSON.stringify(formData),
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error details from API:', errorText);
        throw new Error(errorText || 'Unknown error occurred');
      }

      const data = await response.json();
      console.log('Booking successful:', data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
      setError(`Booking failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (data?.images?.length ?? 1) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (data?.images?.length ?? 1) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  // const parallaxRotate = useTransform(scrollY, [0, 500], [0, 10]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      x.set(deltaX * 20);
      rotate.set(deltaX * 10);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [x, rotate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-700">
        <motion.div
          className="w-24 h-24 border-t-4 border-white border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-700">
        <p className="text-center text-3xl text-white font-bold">No car data available.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-6xl font-extrabold text-white sm:text-7xl sm:tracking-tight lg:text-8xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Experience the Future
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-2xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Book your exclusive test drive and feel the power of innovation.
            </motion.p>
          </motion.div>

          <motion.div
            ref={containerRef}
            // style={{ y: parallaxY, rotateX: parallaxRotate, x, rotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white shadow-2xl rounded-2xl overflow-hidden transform-gpu"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 w-full md:w-1/2 relative h-96 md:h-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={data.images?.[currentImageIndex]?.url ?? '/placeholder.svg'}
                    alt={`${data.carName ?? 'Car'} - View ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-3"
                    onClick={prevImage}
                  >
                    <ChevronLeftIcon className="w-8 h-8 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-3"
                    onClick={nextImage}
                  >
                    <ChevronRightIcon className="w-8 h-8 text-white" />
                  </motion.button>
                </div>
                <motion.button
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowFeatures}
                >
                  {showFeatures ? 'Hide Features' : 'Explore Features'}
                </motion.button>
              </div>
              <div className="p-8 w-full md:w-1/2 relative">
                <AnimatePresence>
                  {showFeatures && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-white z-10 p-8 overflow-y-auto"
                    >
                      <h3 className="text-3xl font-bold text-blue-900 mb-6">Car Specifications</h3>
                      {loadingFeatures ? (
                        <div className="flex items-center justify-center h-64">
                          <Loader2Icon className="w-12 h-12 text-blue-500 animate-spin" />
                        </div>
                      ) : (
                        <ul className="space-y-6">
                          {carFeatures?.map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center space-x-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <span className="text-blue-600 bg-blue-100 rounded-full p-3">
                                {feature.icon}
                              </span>
                              <span className="text-xl text-gray-800 font-medium">{feature.text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      <motion.button
                        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFeatures(false)}
                      >
                        Back to Booking
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isSubmitted ? (
                  <>
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
                      Exclusive Booking
                    </div>
                    <h2 className="text-4xl leading-tight font-extrabold text-blue-900 mb-6">
                      Reserve Your {data.carName ?? 'Car'} Experience
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="name" className="block text-sm font-medium text-blue-700">
                            Full Name
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                            Email
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MailIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="phone" className="block text-sm font-medium text-blue-700">
                            Phone Number
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PhoneIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="(123) 456-7890"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="date" className="block text-sm font-medium text-blue-700">
                            Preferred Date
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CalendarIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <DatePicker
                              selected={formData.date}
                              onChange={handleDateChange}
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholderText="Select date"
                              minDate={new Date()}
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="time" className="block text-sm font-medium text-blue-700">
                            Preferred Time
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <ClockIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <input
                              type="time"
                              name="time"
                              id="time"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              value={formData.time}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <label htmlFor="carModel" className="block text-sm font-medium text-blue-700">
                            Car Model
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CarIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <input
                              type="text"
                              name="carModel"
                              id="carModel"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              value={formData.carModel}
                              readOnly
                              required
                            />
                          </div>
                        </motion.div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label htmlFor="message" className="block text-sm font-medium text-blue-700">
                          Additional Message (Optional)
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Any special requests or comments..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </motion.div>
                      <div className="flex justify-center">
  <motion.button
    type="submit"
    className={`${
      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
    } text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg`}
    disabled={isLoading}
    whileHover={!isLoading ? { scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
    whileTap={!isLoading ? { scale: 0.95 } : {}}
  >
    {isLoading ? (
      <motion.div
        className="inline-flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2Icon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
        Reserving...
      </motion.div>
    ) : (
      "Reserve Your Experience"
    )}
  </motion.button>
</div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-2 text-center"
                        >
                          {error}
                        </motion.p>
                      )}
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CheckCircleIcon className="h-24 w-24 text-green-500" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-blue-900 mt-6">Booking Confirmed!</h3>
                    <p className="text-blue-700 mt-4 text-center text-lg">
                      Your test drive for the {data.carName ?? 'selected car'} has been successfully scheduled.
                    </p>
                    <p className="text-blue-600 mt-2 text-center">
                      Prepare for an unforgettable journey into the future of driving.
                    </p>
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-gray-600 text-center">
                        We'll send you a confirmation email with all the details.
                        <br />
                        If you have any questions, please don't hesitate to contact us.
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default TestDrive;