import { useState } from 'react';
import { Search, Car, DollarSign, Truck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState(''); // Initialize search query as empty string
  const [openFaq, setOpenFaq] = useState(null); // Tracks which FAQ is open; null means none are open

  // Array of FAQs
  const faqs = [
    {
      question: "How do I list my car for sale on CarsNagpur?",
      answer:
        "To list your car on CarsNagpur, log into your account, click on 'Sell a Car', and follow our step-by-step process. You'll need to enter your car's details, upload high-quality photos, and set a competitive price. Our system will guide you through each step to ensure you provide all necessary information for potential buyers.",
    },
    {
      question: "What fees are associated with selling my car on CarsNagpur?",
      answer:
        "CarsNagpur charges a small listing fee and a success fee. The listing fee is ₹999, which allows your car to be visible on our platform for up to 60 days. If your car sells, we charge a success fee of 1% of the final sale price, capped at ₹9,999. This fee structure ensures we're motivated to help you sell your car quickly and at a good price.",
    },
    {
      question: "How long does it typically take to sell a car on CarsNagpur?",
      answer:
        "The time to sell a car varies depending on factors like price, condition, demand, and location. On average, cars sell within 2-4 weeks on CarsNagpur. Popular models priced competitively can sell much faster, sometimes within days. We provide tools and tips to help you optimize your listing and sell your car as quickly as possible.",
    },
    {
      question: "Is there a warranty on the cars I buy through CarsNagpur?",
      answer:
        "All cars listed on CarsNagpur come with a basic 7-day money-back guarantee. This allows you to return the car if you're not satisfied, giving you peace of mind with your purchase. Additionally, many sellers offer extended warranties, and we have partnerships with warranty providers for extra protection. Always check the specific warranty details on each listing.",
    },
    {
      question: "How does CarsNagpur ensure the safety of transactions?",
      answer:
        "At CarsNagpur, we prioritize the safety and security of all transactions. We verify seller information, provide a secure messaging system, and offer an escrow service for high-value purchases. We also recommend meeting in safe, public locations for vehicle inspections and encourage buyers to use trusted mechanics for pre-purchase inspections.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle function for opening/closing FAQ
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with background image */}
      <div
        className="bg-cover bg-center bg-gradient-to-r from-blue-900 to-blue-700 text-white h-[430px]"
        style={{
          backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20240329/pngtree-teamwork-goals-strategy-business-support-concept-image_15664860.jpg)', // Replace with your background image URL
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 ">Welcome to CarsNagpur Help Center</h1>
              <p className="text-xl mb-6">
                Find answers, get support, and make the most of your CarsNagpur experience.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </button>
            </div>
            <div className="hidden md:block">
              <img
                // src="https://media.istockphoto.com/id/1340452442/vector/customer-support-department-staff-helping-a-client-via-hotline-call-to-solve-a-problem.jpg?s=612x612&w=0&k=20&c=b3HFZ1gkozVWKVENg4il-lqdj8hUfFQCYJemQ9UOnsg="
                // alt="CarsNagpur Support"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search and FAQs section */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mb-12 -mt-16 bg-white rounded-lg shadow-lg p-6">
          <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-orange-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 text-lg"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Car, title: 'Selling Your Car', items: ['List Your Car', 'Pricing Guide', 'Seller Tips'] },
            { icon: DollarSign, title: 'Buying a Car', items: ['Search Inventory', 'Financing Options', 'Buyer\'s Guide'] },
            { icon: Truck, title: 'Our Services', items: ['Vehicle Inspection', 'Secure Transactions', 'Extended Warranties'] },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-orange-500 transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6">
                <section.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold text-blue-900 mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <ChevronDown className="w-4 h-4 text-orange-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
          <div className="px-6 py-4 bg-blue-900 text-white flex items-center">
            <HelpCircle className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-blue-900">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-500" />
                  )}
                </button>
                {openFaq === index && <p className="mt-4 text-gray-600 animate-fadeIn">{faq.answer}</p>}
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="p-6 text-gray-600">No results found. Please try a different search term.</div>
            )}
          </div>
        </div>

        {/* Contact Support Button */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Need more help?</h3>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
