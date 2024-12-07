import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Award, Truck, Tag, BarChart2 } from 'lucide-react'
import dealer from '../Img/delership.png'

function DealerShip() {
  // Arrays for cities and cars
  const cities = [
    { name: "Burdi", image: 'https://i.pinimg.com/736x/35/cf/ae/35cfaed52d34cfa0c9a4687d3b7971af.jpg' },
    { name: "Manewada", image: 'https://i.pinimg.com/564x/71/75/e1/7175e1af4c99be42166e8d68d52a63a9.jpg' },
    { name: "Dighori", image: 'https://i.pinimg.com/736x/1c/1b/42/1c1b42f7301525214d6298532530a95f.jpg' },
    { name: "Vardhyaman Nagar", image: 'https://i.pinimg.com/736x/1e/13/50/1e1350ee86072add28e84f06e531162a.jpg' }, // Changed src to image
    { name: "Somalwada", image: 'https://i.pinimg.com/736x/7b/89/50/7b895031d880dd94dab1d62e0c6b05af.jpg' },
    { name: "Friends Colony", image: 'https://i.pinimg.com/736x/2d/ab/7e/2dab7e6de38960601d724d1cae494110.jpg' },
    { name: "Sadar", image: 'https://i.pinimg.com/564x/90/ce/c6/90cec61c5ba04aa36c7dc50716f0cb91.jpg' }, // Corrected imager to image
    { name: "Katolnaka", image: 'https://i.pinimg.com/564x/4c/b7/c3/4cb7c35164310fbdb02ad4a91da23319.jpg' },
    { name: "Jaripatka", image: 'https://i.pinimg.com/736x/8a/96/f2/8a96f2b46e4ddd8485603d2e1c2656f3.jpg' },
    { name: "Itwari", image: 'https://i.pinimg.com/564x/e9/44/ee/e944eeed27610385cd36283e9121a253.jpg' },
    { name: "Dharampeth", image: 'https://i.pinimg.com/736x/0d/ce/77/0dce77b996b2ee08ca236c445091c593.jpg' },
    { name: "Hudkeshwar", image: 'https://i.pinimg.com/736x/dd/37/a1/dd37a124deb5735283052da94e71b5e1.jpg' }
  ];
  
  const dealers = [
    { name: 'Citizen Carz', image: '/images/citizen-carz.jpg' },
    { name: 'Chennai Motorss', image: '/images/chennai-motors.jpg' },
    { name: 'Broker Dalal', image: '/images/broker-dalal.jpg' },
    { name: 'Luxury Wheels', image: '/images/luxury-wheels.jpg' }, // Add more dealer items as needed
  ];

  const cars = [
    { name: "Hyundai i20", price: "₹ 2,49,000", image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-thumbnail/Thumbnail/creta-suvpc.png" },
    { name: "Hyundai Grand i10", price: "₹ 3,40,930", image: "https://imgd.aeplcdn.com/1056x594/n/t4frrua_1559467.jpg?q=80" },
    { name: "Maruti Baleno", price: "₹ 5,00,000", image: "https://imgd.aeplcdn.com/1200x900/cw/ec/37710/Maruti-Suzuki-Baleno-Right-Front-Three-Quarter-147420.jpg?wm=0&q=80" },
    { name: "Hyundai Creta", price: "₹ 8,01,000", image: "https://imgd-ct.aeplcdn.com/664x415/n/1ihrrua_1559469.jpg?q=80" },
  ];


  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: "FINANCING MADE EASY",
      description: "Our stress-free finance department that can find financial solutions to save you money."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "WIDE RANGE OF BRANDS",
      description: "With a robust selection of popular vehicles on hand, as well as leading vehicles from BMW and Ford."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "TRUSTED BY THOUSANDS",
      description: "10 new offers every day. 350 offers on site, trusted by a community of thousands of users."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "CAR SERVICE & MAINTENANCE",
      description: "Our service department maintain your car to stay safe on the road for many more years."
    }
  ]

  const feature = [
    {
      icon: Award,
      title: "India's #1",
      subtitle: "Largest Auto portal"
    },
    {
      icon: Truck,
      title: "Car Sold",
      subtitle: "Every 4 minute"
    },
    {
      icon: Tag,
      title: "Offers",
      subtitle: "Stay updated pay less"
    },
    {
      icon: BarChart2,
      title: "Compare",
      subtitle: "Decode the right car"
    }
  ]

  return (
    <div className="relative bg-white">
      {/* Background image with overlay */}
      <div className="relative h-[630px]">
        <img
          src={dealer} // Background image
          alt="Car background"
          className="w-full h-[630px] object-cover"
        />
        <div className="absolute inset-0 bg-gray-600 h-[630px] bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-[630px] flex flex-col justify-center items-center space-y-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
          Helping you connect to <br /> the right used car dealers
        </h1>

        {/* Search box */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Nagpur"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Select Locality"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600">
            Search
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Used Car Showrooms in Nagpur</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Popular Cities */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Used Car Dealer in Popular Areas</h2>
              <input
                type="text"
                placeholder="🔍 Search your city"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* City Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <img src={city.image} className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full"/>
                  <p className="text-lg font-semibold">{city.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Popular Used Cars */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Used Cars in Nagpur</h2>
            <div className="space-y-4">
              {cars.map((car, index) => (
                <div
                  key={index}
                  className="flex items-center border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-gray-600">{car.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Used Luxury Cars Dealership */}
      





{/* last 3rd */}

<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-4">
          WHY CHOOSE US
        </h2>
        <div className="h-1 w-20 bg-orange-500 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 uppercase text-sm">
            Learn More
          </button>
        </div>
      </div>
    </section>



{/* footer above section */}

<div
  className="relative h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('https://images6.alphacoders.com/303/thumb-1920-303578.jpg')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="w-full md:w-2/3 lg:w-1/2">
      <div className="bg-orange-400 p-8 rounded-lg shadow-lg relative">
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-400 transform rotate-45"></div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          CAR DEALERSHIP AUTOMOTIVE 
        </h1>
        <p className="text-gray-800 text-sm sm:text-base">
          With specialists on hand to help with any part of the car shopping or vehicle ownership experience, Motors provides financing, car service and a great selection of vehicles for luxury car shoppers in Chicago, IL. Motors is ultimate Automotive, Car Dealer WordPress theme.
        </p>
      </div>
    </div>
  </div>
</div>


      
      {/* For Your Further Research */}
      <section className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">For Your Further Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow">
            <img src="https://imgd.aeplcdn.com/1056x594/n/t4frrua_1559467.jpg?q=80" alt="Used Cars Icon" className="w-10 h-10" />
            <div>
              <p className="font-semibold">Used Cars In Gurgaon</p>
              <a href="#" className="text-blue-500 hover:underline">View All (2445)</a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow">
            <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/150603/i20-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80" alt="Sell Car Icon" className="w-10 h-10" />
            <div>
              <p className="font-semibold">Sell Your Car For Free</p>
              <a href="#" className="text-blue-500 hover:underline">Upload Car</a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow">
            <img src="https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-thumbnail/Thumbnail/creta-suvpc.png" alt="Price Valuation Icon" className="w-10 h-10" />
            <div>
              <p className="font-semibold">Get The True Price Of Your Car</p>
              <a href="#" className="text-blue-500 hover:underline">Start Valuation</a>
            </div>
          </div>
        </div>
      </section>


      
{/*  last 2nd portion*/}

<div className="bg-gray-100 py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {feature.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <feature.icon className="h-8 w-8 text-orange-500" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>

    
  );
}

export default DealerShip;