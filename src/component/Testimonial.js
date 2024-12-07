import React from 'react'
import { Star, Play, ChevronDown } from 'lucide-react'

const featuredTestimonials = [
  { name: 'Sanjana Kashimkar', role: 'Car Seller', content: 'Overall I loved the experience. Ill definitely recommend CarsNagpur', image: 'https://media.licdn.com/dms/image/v2/D5603AQEalhphXU207A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727938817412?e=1733356800&v=beta&t=NGwZ1UAY1zcbiCXqVSd44RyjNCVFro4RurHxVPVuS9M' },
  { name: 'Pranav Belorkar', role: 'Car Seller', content: 'Selling your car on CarsNagpur is definitely very easy, simple & hassle-free', image: 'https://media.licdn.com/dms/image/v2/C5603AQEGXdSGRQgYhA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1662537406204?e=1733356800&v=beta&t=-zcjrPn5mD39eYGZQWdS1oDT7_3TjDLpaB68OXw2KC4' },
  { name: 'Muskan Burde', role: 'Car Buyer', content: 'I will surely recommend CarsNagpur. Overall a very satisfying experience', image: 'https://i.pinimg.com/736x/50/17/5d/50175d34461e9e77f7f0f0eedd17f0bd.jpg' },
]

const reviews = [
  { name: 'Ashish', initial: 'A', rating: 5, content: 'Had a great hassle-free experience in selling my car at CarsNagpur. Excellent and professional offering, and the entire process was smooth.' },
  { name: 'Mithu', initial: 'M', rating: 5, content: 'It was nice experience. They have estimated my car with good price. Very happy with their service and professionalism.' },
  { name: 'Husain', initial: 'H', rating: 5, content: 'Excellent team and extremely helpful with the whole process! Would recommend CarsNagpur to anyone looking to sell their car!' },
  { name: 'Pradhan', initial: 'P', rating: 5, content: 'I am Pradhansinh Jadeja from Mumbai. I have got an excellent experience from CarsNagpur. They have given me the best price for my car.' },
  { name: 'Sachin', initial: 'S', rating: 5, content: 'Had a wonderful experience with CarsNagpur team and took home a beautiful car. Hassle-free paperwork and great customer service.' },
  { name: 'Ranju', initial: 'R', rating: 5, content: 'Selling with CarsNagpur was an excellent experience. I received the payment instantly. Strongly recommended.' },
]

const tweets = [
  { name: 'Neha Bhasin', handle: '@nehabhasin', content: 'I sold my Swift for a very good price and got the money transferred within 30 minutes. The process was so smooth! @CarsNagpur' },
  { name: 'Varun Menon', handle: '@varunmenon', content: "It's very convenient to sell your car to CarsNagpur at a fair price, which will save you money and headache. Somebody just collected it within hours. It's very reliable." },
  { name: 'Sam Edwin', handle: '@samedwin', content: 'Selling my car through @CarsNagpur was quick and convenient. Highly recommend their service. Easy, fast, and extremely smooth!' },
]

const videoTestimonials = [
  { name: 'Priya Patel', role: 'Car Buyer', thumbnail: 'https://i.pinimg.com/736x/4b/f6/77/4bf677435fc4a7aa023fdca83d4d8562.jpg', videoUrl: '#' },
  { name: 'Rahul Sharma', role: 'Car Seller', thumbnail: 'https://i.pinimg.com/236x/e6/21/9b/e6219b93a72b6376e381a454cf366df9.jpg', videoUrl: '#' },
  { name: 'Amit Singh', role: 'Car Seller', thumbnail: 'https://i.pinimg.com/564x/28/11/1d/28111d6553df540427f4fa430ab761b6.jpg', videoUrl: '#' },
]

const faqs = [
  { question: 'How does CarsNagpur determine the value of my car?', answer: 'CarsNagpur uses advanced algorithms and market data to provide an accurate valuation of your car based on its make, model, year, condition, and other relevant factors.' },
  { question: 'How long does the selling process take?', answer: 'The entire process, from inspection to payment, can be completed in as little as 24 hours, depending on the availability of our team and the completeness of your documentation.' },
  { question: 'Is there a fee for selling my car through CarsNagpur?', answer: 'No, there are no fees for sellers. CarsNagpur handles all the paperwork and transfer processes at no additional cost to you.' },
  { question: 'What documents do I need to sell my car?', answer: 'Youll need your cars registration certificate, insurance papers, and a valid ID proof. Our team will guide you through any additional requirements based on your specific situation.' },
]

export function Testimonial() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
  className="bg-[#f4f4f4] py-12 bg-cover bg-center" 
  style={{ backgroundImage: "url('https://www.shutterstock.com/image-illustration/woman-removing-rating-star-blue-600nw-2352388351.jpg')" }}
>
  <div className="bg-opacity-50 bg-white py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#253858] mb-2">CarsNagpur reviews and testimonials:</h1>
      <h2 className="text-2xl font-bold text-[#253858] mb-4">Real customer feedback</h2>
      <div className="w-16 h-1 bg-orange-500 mb-8"></div>
      <div className="grid md:grid-cols-3 gap-6">
        {featuredTestimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={testimonial.image} alt={testimonial.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">{testimonial.content}</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
              <button className="mt-2 flex items-center text-blue-600">
                <Play size={16} className="mr-2" />
                Watch Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Happy Sellers Count */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#253858]">Over 4 lakh+ happy sellers and counting</h2>
          <div className="w-16 h-1 bg-orange-500 mt-2"></div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-2">
                    {review.initial}
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-orange-500 text-white px-6 py-2 rounded font-semibold hover:bg-orange-600 transition duration-300">
              VIEW MORE
            </button>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-12 bg-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Video Testimonials</h2>
          <div className="w-16 h-1 bg-orange-500 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={video.thumbnail} alt={video.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{video.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.role}</p>
                  <button className="mt-2 flex items-center text-blue-600">
                    <Play size={16} className="mr-2" />
                    Watch Testimonial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Twitter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#253858] mb-2">Our Family on Twitter</h2>
          <div className="w-16 h-1 bg-orange-500 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {tweets.map((tweet, index) => (
              <div key={index} className="bg-[#f4f4f4] p-4 rounded shadow">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <div>
                    <h3 className="font-semibold">{tweet.name}</h3>
                    <p className="text-sm text-gray-600">{tweet.handle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-800">{tweet.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-orange-500 mb-8"></div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button className="flex justify-between items-center w-full p-4 text-left">
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown size={20} />
                </button>
                <div className="p-4 border-t">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to sell your car?</h2>
          <p className="mb-8 text-lg">Experience the easiest way to sell your car with CarsNagpur</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}
export default Testimonial
