import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Car, DollarSign, Shield, Clock } from 'lucide-react';

const faqs = [
  {
    category: "Selling a Car",
    icon: <Car className="w-6 h-6" />,
    questions: [
      {
        q: "How do I list my car for sale on CarsNagpur?",
        a: "To list your car on CarsNagpur, create an account, click on 'Sell Your Car', and follow our step-by-step process. You'll need to provide details about your car, upload high-quality photos, and set your asking price."
      },
      {
        q: "What fees does CarsNagpur charge for selling my car?",
        a: "CarsNagpur charges a small listing fee of ₹999, which keeps your car visible for 30 days. If your car sells, there's a success fee of 1% of the final sale price, capped at ₹9,999."
      },
      {
        q: "How long does it usually take to sell a car on CarsNagpur?",
        a: "The time to sell varies based on factors like price, condition, and demand. On average, cars sell within 2-3 weeks on CarsNagpur, but some may sell faster or take longer."
      }
    ]
  },
  {
    category: "Buying a Car",
    icon: <DollarSign className="w-6 h-6" />,
    questions: [
      {
        q: "How do I contact a seller on CarsNagpur?",
        a: "Each listing on CarsNagpur has a 'Contact Seller' button. Click it to send a message directly through our platform. For your safety, we recommend keeping all communication within our system."
      },
      {
        q: "Does CarsNagpur offer any warranty on the cars I buy?",
        a: "CarsNagpur provides a basic 7-day money-back guarantee on all purchases. Extended warranties are available for an additional cost. Always check the listing details and ask the seller for specifics about the car's condition and any existing manufacturer warranty."
      },
      {
        q: "Can I arrange a test drive through CarsNagpur?",
        a: "Yes, you can arrange a test drive directly with the seller through CarsNagpur. We recommend meeting in a safe, public location and bringing a friend or family member with you. Always inform CarsNagpur support about your planned test drive for added security."
      }
    ]
  },
  {
    category: "Safety & Security",
    icon: <Shield className="w-6 h-6" />,
    questions: [
      {
        q: "How does CarsNagpur verify sellers?",
        a: "CarsNagpur uses a rigorous verification process including ID verification, email confirmation, and phone verification. We also conduct background checks on high-value sellers. However, always exercise caution and follow our safety guidelines when meeting sellers."
      },
      {
        q: "Is my personal information safe with CarsNagpur?",
        a: "At CarsNagpur, we take data security seriously. Your personal information is encrypted and never shared with third parties without your consent. We comply with all Indian data protection laws. Read our Privacy Policy for more details."
      },
      {
        q: "What should I do if I suspect fraud on CarsNagpur?",
        a: "If you suspect fraudulent activity on CarsNagpur, immediately cease communication with the suspected party and report the listing or user to our support team. We have a dedicated fraud prevention team that investigates all reports thoroughly and takes swift action."
      }
    ]
  },
  {
    category: "CarsNagpur Platform Usage",
    icon: <Clock className="w-6 h-6" />,
    questions: [
      {
        q: "How long do listings stay active on CarsNagpur?",
        a: "Standard listings on CarsNagpur remain active for 30 days. You can renew or relist your car if it hasn't sold within this period. Premium listings have extended visibility options."
      },
      {
        q: "Can I edit my CarsNagpur listing after it's live?",
        a: "Yes, you can edit most details of your CarsNagpur listing at any time. However, significant changes like price adjustments may affect your listing's visibility. We recommend keeping your listing up-to-date for the best results."
      },
      {
        q: "How do I delete my CarsNagpur account?",
        a: "To delete your CarsNagpur account, go to your account settings and select 'Delete Account'. Note that this action is irreversible and will remove all your listings and messages. If you have any active transactions, please contact our support team before deleting your account."
      }
    ]
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-cover bg-center h-[400px] flex items-center justify-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/puzzle-solving-question-mark-background-guidance-support_1017-43014.jpg')" }}>
        <div className="text-center text-white bg-orange-400 bg-opacity-75 p-8 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">CarsNagpur FAQ</h1>
          <p className="text-xl mb-6">Find answers to all your questions about buying and selling cars in Nagpur</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 -mt-24 bg-white rounded-lg shadow-lg p-6">
          <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-orange-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredFaqs.map((category) => (
          <div key={category.category} className="mb-6">
            <button
              className="flex items-center justify-between w-full text-left text-lg font-semibold text-blue-900 bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-150 ease-in-out"
              onClick={() => toggleCategory(category.category)}
            >
              <span className="flex items-center">
                <span className="text-orange-500 mr-2">{category.icon}</span>
                <span>{category.category}</span>
              </span>
              {openCategory === category.category ? (
                <ChevronUp className="w-5 h-5 text-orange-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-orange-500" />
              )}
            </button>
            {openCategory === category.category && (
              <div className="mt-2 space-y-2">
                {category.questions.map((q) => (
                  <div key={q.q} className="bg-white rounded-lg shadow-sm">
                    <button
                      className="flex items-center justify-between w-full text-left p-4 focus:outline-none"
                      onClick={() => toggleQuestion(q.q)}
                    >
                      <span className="font-medium text-blue-800">{q.q}</span>
                      {openQuestion === q.q ? (
                        <ChevronUp className="w-5 h-5 text-orange-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-orange-500" />
                      )}
                    </button>
                    {openQuestion === q.q && (
                      <div className="px-4 pb-4 text-gray-600">{q.a}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Contact CarsNagpur Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
