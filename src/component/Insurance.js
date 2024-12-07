import React, { useState } from 'react';
import {
  Shield,
  Clock,
  DollarSign,
  Car,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Comprehensive Coverage',
    description:
      'Full protection against accidents, theft, and natural disasters',
  },
  {
    icon: Clock,
    title: '24/7 Roadside Assistance',
    description: 'Round-the-clock support for peace of mind on every journey',
  },
  {
    icon: DollarSign,
    title: 'Flexible Payments',
    description: 'Tailored payment plans to suit your financial needs',
  },
  {
    icon: Car,
    title: 'New Car Replacement',
    description:
      'Get a brand new car if yours is totaled within the first year',
  },
];

const plans = [
  {
    name: 'Basic',
    price: 49,
    features: [
      'Liability coverage',
      'Uninsured motorist protection',
      '24/7 customer support',
    ],
  },
  {
    name: 'Standard',
    price: 99,
    features: [
      'All Basic features',
      'Comprehensive coverage',
      'Collision coverage',
      // 'Rental car reimbursement',
    ],
  },
  {
    name: 'Premium',
    price: 149,
    features: [
      'All Standard features',
      'Gap insurance',
      'Personal injury protection',
      // 'Custom parts coverage',
    ],
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Small Business Owner',
    content:
      'Switching to this insurance was the best decision. Their customer service is unparalleled!',
  },
  {
    name: 'Michael R.',
    role: 'Family Man',
    content:
      'The peace of mind I get from their comprehensive coverage is worth every penny.',
  },
  {
    name: 'Emily T.',
    role: 'Recent Graduate',
    content:
      'As a new driver, I appreciate how they made everything easy to understand and affordable.',
  },
];

const faqs = [
  {
    question: 'What does car insurance typically cover?',
    answer:
      'Car insurance typically covers liability for injuries and property damage, collision damage to your car, comprehensive coverage for theft and non-collision damage, and medical payments or personal injury protection.',
  },
  {
    question: 'How are car insurance rates determined?',
    answer:
      'Car insurance rates are determined by factors such as your driving record, age, type of car, location, credit score, and the level of coverage you choose.',
  },
  {
    question: 'Can I switch car insurance providers at any time?',
    answer:
      'Yes, you can switch car insurance providers at any time. However, it\'s often easiest to switch when your current policy is up for renewal to avoid any cancellation fees.',
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-blue-900 hover:text-blue-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && <p className="pb-4 text-gray-600">{answer}</p>}
    </div>
  );
};

export  function Insurance() {
  return (
    <div className="bg-gray-50 min-h-screen ">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className='w-full md:ml-[-147px] mt-[-50px] '>
        <div className="bg-cover bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl overflow-hidden mb-16 md:w-[1515px] h-full" style={{ backgroundImage: "url('https://st2.depositphotos.com/1071909/7421/i/450/depositphotos_74218783-stock-photo-family-life-insurance-and-policy.jpg')" }}>
          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Drive with Confidence</span>
              <span className="block text-orange-400">Insure with CarSure</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-blue-100 sm:max-w-3xl">
              Protect your journey with our comprehensive car insurance. Get a quote today and enjoy peace of mind on every road.
            </p>
            <div className="mt-10 sm:flex">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-orange-400 hover:bg-orange-300 md:py-4 md:text-lg md:px-10"
                >
                  Get Your Free Quote
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-12">Why Choose CarsNagpur?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                      <feature.icon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-blue-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plans Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-semibold text-blue-900 text-center">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-5xl font-extrabold text-orange-500 text-center">
                    ${plan.price}
                    <span className="text-base font-normal text-gray-500">/month</span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                        <span className="ml-3 text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className='w-full md:ml-[-147px]'>
        <div className="bg-cover h-full md:w-[1515px] opacity-90 mb-16 bg-blue-900 rounded-lg shadow-xl overflow-hidden" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/09/29/15/01/360_F_929150196_lToTZymFCw9t47PDA2MsuSTvhd0CcEU1.jpg')" }}>
          <div className="px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-blue-800 rounded-lg p-6 text-center">
                  <Star className="h-6 w-6 text-orange-500 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-base text-white italic mb-4">"{testimonial.content}"</p>
                  <p className="text-lg font-semibold text-orange-400">{testimonial.name}</p>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='w-full md:ml-[-147px]'>
        <div className="bg-cover text-center py-16 bg-blue-600 text-white rounded-lg md:w-[1515px] h-full shadow-xl"style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/08/00/56/76/360_F_800567668_rswDUNh6no2SbMwVaYgjlCCIB5neuV7G.jpg')" }}>
          <h2 className="text-4xl font-extrabold mb-4">Get Insured Today</h2>
          <p className="text-xl mb-8">Sign up now or talk to one of our insurance experts to get started.</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="bg-orange-400 text-blue-900 font-semibold py-2 px-6 rounded-md hover:bg-orange-300"
            >
              Sign Up
            </a>
            <a
              href="#"
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50"
            >
              Contact an Expert
            </a>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

export default Insurance