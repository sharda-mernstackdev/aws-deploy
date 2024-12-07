import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const carouselImages = [
  'https://i.pinimg.com/564x/38/46/1e/38461e0ecb8fb2e38e16b7bb124a849c.jpg',
  'https://i.pinimg.com/736x/d5/c0/7f/d5c07f94967a17669435253d259c1a8b.jpg',
  'https://i.pinimg.com/564x/f7/1a/db/f71adba018cee51c84720113ff6a7dea.jpg',
]

const specializedServices = [
  { name: 'Schedule maintenance', icon: '🔧' },
  { name: 'Wheel care', icon: '🚗' },
  { name: 'AC service & repair', icon: '❄' },
  { name: 'Car inspection', icon: '🔍' },
  { name: 'Denting and painting', icon: '🎨' },
  { name: 'Suspension repair', icon: '🔩' },
  { name: 'Steering repair', icon: '🚘' },
  { name: 'Transmission', icon: '⚙' },
  { name: 'Brakes maintenance', icon: '🛑' },
  { name: 'Car detailing', icon: '✨' },
  { name: 'Car cleaning', icon: '🧼' },
  { name: 'Car shine', icon: '🌟' },
]

const maintenancePackages = [
  {
    name: 'Essential Service Package',
    description: 'Engine oil replacement, Oil filter replacement',
    image:'https://i.pinimg.com/564x/de/f7/75/def77519e5e546eaf2cd43d6fdb0d9f4.jpg'
  },
  {
    name: 'Max Service Package',
    description: 'Engine oil replacement, Wheel Alignment/Balance',
    image: 'https://i.pinimg.com/564x/ea/1d/f7/ea1df7e71b4d4f119aeaa1698e88b2cf.jpg'
  },
  {
    name: 'Luxury Service Basic',
    description: 'Engine Oil Replacement, Oil Filter Replacement',
    image: 'https://i.pinimg.com/564x/56/af/7e/56af7e9ba82de76ddaf25c829c41ffb8.jpg'
  },
  {
    name: 'Luxury Service Premium',
    description: 'Engine oil replacement, Cabin air filter replacement',
    image: 'https://i.pinimg.com/736x/a1/f0/e2/a1f0e2bd40ab56513aa3d52d89abc213.jpg'
  },
]

const acServices = [
  {
    name: 'Regular AC Service',
    description: 'Thorough AC inspection • Takes 60 mins • Includes 5 activities',
    image: 'https://media.fourdoor.com/fourdoor-images/package-pdp-images/718-x-428/regular-ac-service.jpg?h=238&w=400'
  },
  {
    name: 'Detailed AC Service',
    description: 'Thorough AC inspection • Takes 4 hours • Includes 9 activities',
    image: 'https://i.pinimg.com/564x/70/4d/aa/704daa789a9c361bccf483d9b9b73646.jpg',
    recommended: true,
  },
  {
    name: 'Radiator Flush & Cleaning',
    description: 'Enhances engine cooling • Takes 2 hours • Includes 5 activities',
    image: 'https://i.pinimg.com/564x/88/1d/f5/881df58166dc2eb5fa6d197e8103f1c3.jpg',
    new: true,
  },
]

export  function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Carousel and Search Bar */}
      <section className="relative h-[300px] md:h-[600px] overflow-hidden">

        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={carouselImages[currentSlide]}
            alt={ `${currentSlide + 1}`}
            className="absolute inset-0 w-full h-full object-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Car Service Center</h1>
            <div className="flex justify-center">
              <motion.input
                type="text"
                placeholder="Search for services..."
                className="px-4 py-2 w-64 rounded-l-md focus:outline-none"
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </motion.button>
      </section>

      {/* Explore Car Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Explore Car Services
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {specializedServices.map((service, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 bg-gray-100 rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: '#FEF3C7' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl mb-2">{service.icon}</span>
                <span className="text-center text-sm">{service.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service & Maintenance Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Service & Maintenance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {maintenancePackages.map((pkg, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
          <p className="text-gray-600 text-sm">{pkg.description}</p>
          <motion.button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add car
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>
        </div>
      </section>

      {/* AC Service & Repair Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            AC Service & Repair
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <motion.button
                    className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add car to view price
                  </motion.button>
                </div>
                {service.recommended && (
                  <motion.span
                    className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    RECOMMENDED
                  </motion.span>
                )}
                {service.new && (
                  <motion.span
                    className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    NEW
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default Services