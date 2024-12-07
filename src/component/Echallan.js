import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselItem = ({ src, alt }) => (
  <div className="relative w-full flex-shrink-0">
    <img src={src} alt={alt} className="w-full h-[400px] object-cover rounded-lg" />
  </div>
);

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((currentIndex - 1 + children.length) % children.length);
  const next = () => setCurrentIndex((currentIndex + 1) % children.length);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export  function Echallan() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [challanNumber, setChallanNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { vehicleNumber, challanNumber });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-12">
        
        {/* Carousel Section */}
       
        {/* <section className="mb-16 w-full h-screen" >
          <Carousel>
            <CarouselItem
              src="https://i.pinimg.com/564x/72/07/ef/7207efac6b449c62d3f7eb55bebb23c2.jpg"
              alt="Featured Car 1"
            />
            <CarouselItem
              src="/placeholder.svg?height=400&width=800&text=Car+Image+2"
              alt="Featured Car 2"
            />
            <CarouselItem
              src="/placeholder.svg?height=400&width=800&text=Car+Image+3"
              alt="Featured Car 3"
            />
          </Carousel>
        </section>
        */}
        {/* Payment Form Section */}
        <section className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Traffic Challan Payment
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="vehicleNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Number
                </label>
                <input
                  id="vehicleNumber"
                  type="text"
                  placeholder="Enter your vehicle number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="challanNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Challan Number
                </label>
                <input
                  id="challanNumber"
                  type="text"
                  placeholder="Enter challan number"
                  value={challanNumber}
                  onChange={(e) => setChallanNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Check Challan
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Why Pay Traffic Challan Online?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Convenience',
                description: 'Pay anytime, anywhere without visiting a physical office.',
              },
              {
                title: 'Time-Saving',
                description: 'No queues, instant processing of your payment.',
              },
              {
                title: 'Secure Transactions',
                description: 'Safe and encrypted payment gateways for your peace of mind.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-3 text-gray-700">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
export default Echallan;

