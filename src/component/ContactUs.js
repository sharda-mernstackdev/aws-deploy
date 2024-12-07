import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

export  function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the form data to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-orange-600 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://mclaren.scene7.com/is/image/mclaren/McLarenArtura-10:crop-16x9?wid=1600&hei=900')" }}
        >
          <div className="absolute inset-0  opacity-85"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-6 text-xl text-orange-100 max-w-3xl">
            Get in touch with our team of automotive experts. We're here to help you find your perfect ride.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid grid-cols- gap-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                  <Send className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg h-[220px] mt-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
              <div className="mt-5 space-y-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <span className="ml-3 text-gray-500">123 Car Street, Autoville, AV 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-orange-500" />
                  <span className="ml-3 text-gray-500">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-orange-500" />
                  <span className="ml-3 text-gray-500">contact@carsellwebsite.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-gray-300 h-96 rounded-lg overflow-hidden">
          {/* Replace this div with an actual map component */}
          <div className="w-full h-full flex items-center justify-center text-gray-600">
          <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d119081.41676951972!2d78.99915773779198!3d21.140684167695163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bd4c11d142e6ac9%3A0xbb23c4288c53121c!2slower%20ground%20floor%2C%20Fortune%20Mall%2C%20Buty%20Rd%2C%20near%20Maharashtra%20bank%2C%20near%20metro%20station%2C%20Sitabuldi%2C%20Nagpur%2C%20Maharashtra%20440012!3m2!1d21.1407041!2d79.0815594!5e0!3m2!1sen!2sin!4v1727671665511!5m2!1sen!2sin" width="600" height="450" ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactUs;