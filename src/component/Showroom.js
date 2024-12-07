'use client'

import React, { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

const mockShowrooms = [
  { id: 1, name: "Eternity Mall", address: "Variety Square, Sitabuldi" },
  { id: 2, name: "Empress Mall", address: "Pandey Layout, Laxmi Nagar" },
  { id: 3, name: "Central Mall", address: "Ramdaspeth" },
  { id: 4, name: "Trilium Mall", address: "Chindwara Road" },
  { id: 5, name: "VR Mall", address: "Medical Square" },
]

const nagpurGondiaShowrooms = [
  {
    name: "Maruti Suzuki Showroom",
    address: "123 Main St, Nagpur, Maharashtra",
    phone: "+91 1234567890"
  },
  {
    name: "Tata Motors Showroom",
    address: "456 Park Ave, Nagpur, Maharashtra",
    phone: "+91 9876543210"
  },
  {
    name: "Provincial Automobile Co. Pvt.Ltd. - Gondia",
    address: "Fulchur Naka, In Front Of Mahindra Finance Goregaon Road, Gondia, Maharashtra 441614",
    phone: "9850440051"
  },
  {
    name: "Aditya Cars",
    address: "Kohmara Road, Fulchur Naka, Gondia, Maharashtra 441601",
    phone: "7949291392"
  }
]

const showrooms = [
  {
    name: "Patni Toyota - Hingna",
    location: "Plot D3, Central, MIDC, Hingna, Nagpur, Maharashtra 440028",
    email: "info@patnitoyota.com",
    contact: "7104674000"
  },
  {
    name: "Patni Autoventures Llp-Hingna",
    location: "Plot C/9, Central MIDC, Wadi road, Hingna, Nagpur, Maharashtra 440016",
    email: "info@patniskoda.com",
    contact: "7796614825"
  },
  {
    name: "Arun Nexa-Hingna",
    location: "Patni Arcade, main road, Midc, Hingna, Nagpur, Nagpur, Maharashtra 440028",
    contact: "08045248696"
  },
  {
    name: "Aditya Cars-Nagpur",
    location: "Near Kadu Petrol Pump, Paradsinga Road Janki Nagar, Nagpur, Maharashtra 441107",
    contact: "07249291392"
  }
]

const trendingCars = [
  { name: "Tata Curvy", price: "9.99 Lakh", image: "https://i.pinimg.com/564x/2c/2f/d9/2c2fd990df9c649e0d4e3d6cf7af5291.jpg" },
  { name: "Mahindra Thar", price: "11.34 Lakh", image: "https://i.pinimg.com/564x/61/a0/7b/61a07b60eb9c238a7905e837f1380f40.jpg" },
  { name: "Tata Punch", price: "5.99 Lakh", image: "https://i.pinimg.com/564x/ec/e8/18/ece81827de9dd5e8d8cc1d244b7ebce5.jpg" },
  { name: "Mahindra Thar ROXX", price: "12.99 Lakh", image: "https://i.pinimg.com/736x/c1/da/d9/c1dad95224cd25cc5983ba97c40dea0b.jpg" },
  { name: "Mahindra Scorpio", price: "13.61 Lakh", image: "https://i.pinimg.com/564x/46/7e/ab/467eabef593742c82150fe14c24f6cf7.jpg" }
]

const faqs = [
  {
    question: "What documents do I need to bring when purchasing a car?",
    answer: "When purchasing a car, you should bring your driver's license, proof of insurance, proof of income, and any trade-in documentation if applicable. It's also a good idea to bring a form of payment, such as a cashier's check or financing pre-approval letter."
  },
  {
    question: "Do you offer test drives?",
    answer: "Yes, we offer test drives for all of our vehicles. We recommend scheduling an appointment in advance to ensure the car you're interested in is available and prepared for your visit."
  },
  {
    question: "What financing options are available?",
    answer: "We offer a variety of financing options to suit different needs. This includes traditional car loans, lease options, and special financing programs for first-time buyers or those with less-than-perfect credit. Our finance team can work with you to find the best option for your situation."
  },
  {
    question: "Do you accept trade-ins?",
    answer: "Yes, we accept trade-ins. Our team can provide you with a fair market value for your current vehicle, which can be applied towards the purchase of your new car. We recommend bringing your trade-in vehicle along with its title and registration when you visit our showroom."
  },
  {
    question: "What warranty options do you offer?",
    answer: "We offer a range of warranty options, including manufacturer warranties on new vehicles and extended warranties for both new and used cars. These can cover various aspects such as powertrain, bumper-to-bumper coverage, and roadside assistance. Our sales team can provide detailed information on warranty options for specific vehicles."
  },
  {
    question: "How long does the car buying process usually take?",
    answer: "The car buying process can vary depending on individual circumstances, but typically it takes about 2-3 hours from start to finish. This includes time for test driving, paperwork, and finalizing financing. We strive to make the process as efficient as possible while ensuring you have all the information you need to make an informed decision."
  },
  {
    question: "Do you offer any after-sales services?",
    answer: "Yes, we provide comprehensive after-sales services including regular maintenance, repairs, and parts replacement. Our service center is staffed with certified technicians who are familiar with all the brands we sell. We also offer courtesy vehicles and pickup/drop-off services for your convenience during servicing."
  }
]

export  function Showroom() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(mockShowrooms)
  const [isOpen, setIsOpen] = useState(false)
  const [showAllShowrooms, setShowAllShowrooms] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredResults = mockShowrooms.filter(showroom =>
      showroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      showroom.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filteredResults)
  }

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(mockShowrooms)
    }
  }, [searchQuery])

  const visibleShowrooms = showAllShowrooms ? showrooms : showrooms.slice(0, 2)
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      <div className="w-full bg-cover bg-center bg-no-repeat h-[300px] md:h-[550px]" 
        style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/luxury-car-dealership-interior-white-wall-showroom-mockup-hd-highlighting-range-innovative-suvs-294593061.jpg')" }}>
        <div className="bg-black bg-opacity-50 py-20 h-full">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">Nagpur Showrooms</h1>
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search showrooms in Nagpur"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border-2 border-white bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:border-blue-300"
                  aria-label="Search showrooms in Nagpur"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </form>
              {/* <div className="bg-white bg-opacity-80 rounded-lg p-4 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map(showroom => (
                      <li key={showroom.id} className="mb-2 last:mb-0">
                        <h2 className="font-semibold">{showroom.name}</h2>
                        <p className="text-sm text-gray-600">{showroom.address}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-600">No showrooms found</p>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="bg-whit-100 shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4 text-blue-900">Car Showrooms in Nagpur</h1>
          <p className="text-gray-600 mb-4">
            We have a total of 4 authorized car showrooms in Nagpur for more than 30+ cars brands including Maruti
            Suzuki, Tata, MG Motor, Mahindra, etc. Get contact information, full address, and the location of the nearest
            car showrooms through Google Maps.
          </p>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Read More
              {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </button>
            {isOpen && (
              <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {nagpurGondiaShowrooms.map((showroom, index) => (
                    <div key={index} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                      <p className="font-medium">{showroom.name}</p>
                      <p className="text-xs">{showroom.address}</p>
                      <p className="text-xs">{showroom.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4  text-blue-900">76 Car Showrooms in Nagpur</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="grid md:grid-cols-2 gap-4">
                {visibleShowrooms.map((showroom, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h2 className="font-bold">{showroom.name}</h2>
                    <p className="text-sm text-gray-600">{showroom.location}</p>
                    {showroom.email && <p className="text-sm">{showroom.email}</p>}
                    <p className="text-sm">{showroom.contact}</p>
                    <div className="mt-2">
                      <button className=" bg-orange-600 text-white px-4 py-2 rounded mr-2">Contact</button>
                      <button className="border border-blue-900  px-4 py-2 rounded  text-blue-900">
                        Check Car Service Offers
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllShowrooms(!showAllShowrooms)}
                  className="inline-flex items-center bg-blue-900 text-white px-4 py-2 rounded-md text-sm"
                >
                  {showAllShowrooms ? (
                    <>
                      View Less <ChevronUp className="ml-1 h-4 w-4 " />
                    </>
                  ) : (
                    <>
                      View More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="md:w-1/3 bg-blue-100 rounded-lg p-4">
              <h2 className="font-bold mb-2  text-blue-900">Trending Cars in India</h2>
              {trendingCars.map((car, index) => (
                <div key={index} className="flex items-center mb-2">
                  <img src={car.image} alt={car.name} className="w-20 h-12 object-cover mr-2" />
                  <div>
                    <p className="font-bold">{car.name}</p>
                    <p className="text-sm text-gray-600">{car.price}</p>
                  </div>
                </div>
              ))}
              {/* <a href="#" className="text-blue-600">All Best Cars in India</a>- */}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {visibleFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          {faqs.length > 4 && (
            <div className="mt-6 text-center">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
              >
                {showAllFaqs ? (
                  <>
                    View Less <ChevronUp className="ml-2 -mr-1 h-5 w-5" />
                  </>
                ) : (
                  <>
                    View More <ChevronDown className="ml-2 -mr-1 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Showroom