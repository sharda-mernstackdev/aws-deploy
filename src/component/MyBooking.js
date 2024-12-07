import React, { useState, ChangeEvent, FormEvent } from 'react'
import { CalendarIcon, ClockIcon, CarIcon, UserIcon, PhoneIcon, MailIcon, HeartIcon, ClipboardListIcon, KeyIcon, CheckCircleIcon } from 'lucide-react'

export function MyBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    carModel: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    // Here you would typically send the form data to your backend
    // and handle the response (e.g., show a success message)
  }

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/electric-cars-suvs-parked-row-600nw-1380375332.jpg')"}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 bg-white bg-opacity-80 rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Your Car Journey</h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-blue-700">Manage your car preferences, bookings, and purchases all in one place.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-orange-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HeartIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-900 truncate">Wishlisted Cars</dt>
                    <dd className="text-3xl font-semibold text-blue-700">4</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-700 hover:text-orange-900">View all</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-orange-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardListIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-900 truncate">Pending Bookings</dt>
                    <dd className="text-3xl font-semibold text-blue-700">2</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-700 hover:text-orange-900">Manage bookings</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-orange-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <KeyIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-900 truncate">Test Drives</dt>
                    <dd className="text-3xl font-semibold text-blue-700">1</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-700 hover:text-orange-900">Schedule new</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg border-t-4 border-orange-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-blue-900 truncate">Purchased Cars</dt>
                    <dd className="text-3xl font-semibold text-blue-700">1</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-700 hover:text-orange-900">View history</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://media.licdn.com/dms/image/v2/D4D12AQEaWLtEuUU4fA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673788280118?e=2147483647&v=beta&t=AK5qqSCFdPZStxfLqYODXhWT5wm-2TFxDaQnur-Jrpw" alt="Luxury car" /> */}
            </div>
            <div className="p-8 w-full">
              <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold mb-1">Book Your Experience</div>
              <h2 className="text-3xl leading-tight font-extrabold text-blue-900 mb-5">Schedule a Test Drive</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-700">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-blue-700">Phone Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium text-blue-700">Car Model</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CarIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <select
                        name="carModel"
                        id="carModel"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={formData.carModel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a model</option>
                        <option value="Model S">Model S</option>
                        <option value="Model 3">Model 3</option>
                        <option value="Model X">Model X</option>
                        <option value="Model Y">Model Y</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-blue-700">Preferred Date</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-blue-700">Preferred Time</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </div>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-700">Additional Comments</label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Any specific requests or questions?"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ml-[530px]"
                  >
                    Book Test Drive
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MyBooking;


