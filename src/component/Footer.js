import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import footer from '..//Img/carlogo4.png'; // Ensure this path is correct
import footer1 from '../Img/new-footer.png'; // Ensure this path is correct

function Footer() {
  return (
    <div className='bg-gray-300'>
      <footer className="bg-gray-200 text-gray-800 py-8 relative">
        <div className="container mx-auto px-4">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start mb-8">
            <img src={footer} alt="CarsNagpur Logo" className="h-12" />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Useful links</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Contact us', href: '/contact' },
                  { label: 'Car insurance', href: '/insurance' },
                  { label: 'About us', href: '/about' },
                  { label: 'Terms and conditions', href: '/terms' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Testimonials', href: '/testimonials' },
                  { label: 'CarsNagpur finance', href: '/financing' },
                  { label: 'Explore new cars', href: '/new-car' }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-blue-600">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Popular searches</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Check challan', href: '/challan' },
                  { label: 'Sell used car', href: '/usedcars' },
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-blue-600">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Other geographies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600">NAGPUR</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Keep in touch</h3>
              <div className="flex space-x-4 mb-4 justify-center md:justify-start">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-gray-600 hover:text-blue-400 cursor-pointer" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="text-gray-600 hover:text-red-600 cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="text-gray-600 hover:text-blue-800 cursor-pointer" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-gray-600 hover:text-pink-600 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>

          {/* Tagline Section */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-8 text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 md:ml-[190px] md:w-[620px] md:-mt-[200px]  ">
                "Creating Memories on Every Mile."
              </h2>
              <p className="text-xl md:ml-[210px]">Your Family's Journey Starts with Us.😊</p>
            </div>
            <img 
              src={footer1}
              alt="Family with car" 
              className="h-[300px] md:h-[400px] md:mt-[-330px] md:ml-[-70px]  md:w-[750px] " 
            />
          </div>

          {/* Footer Bottom */}
          <div className="text-center text-sm text-gray-900">
            © 2024 CarsNagpur. 
            <a href="https://www.pskitservices.com/">
              <b> @ A project of PSK Technologies Pvt. Ltd.</b>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;