import React from 'react'
import { UserCircle, FileText, Briefcase, Gauge , ArrowUpRight, Coins, BarChart3  } from 'lucide-react'
import f1 from '../Img/loan img.png';
import f2 from '../Img/interest.jpg';


const LoanFeature = ({ title, value, subtitle } ) => (
  <div className="bg-gray-800 rounded-lg p-4 text-center">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className="text-4xl font-bold mb-1">{value}</p>
    <p className="text-gray-400 text-sm">{subtitle}</p>
  </div>
)


const features = [
  {
    title: "Finance it\nyour way!",
    description: "Customise EMIs with as low as zero down payment and up to 6 year loan tenure starting at 12% ROI",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <rect width="60" height="80" rx="4" fill="#1E3A8A" />
        <rect x="10" y="10" width="40" height="10" rx="2" fill="#FFA500" />
        <rect x="10" y="30" width="40" height="10" rx="2" fill="#FFA500" />
        <rect x="10" y="50" width="40" height="10" rx="2" fill="#FFA500" />
        <circle cx="80" cy="70" r="20" fill="#FFA500" />
        <path d="M70 70L80 60L90 70M80 60V80" stroke="#1E3A8A" strokeWidth="4" />
      </svg>
    ),
  },
  {
    title: "Loan offer\nin minutes",
    description: "Check your eligibility and get a loan offer within 2 minutes with minimal documentation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" fill="#1E3A8A" />
        <path d="M50 20V50L70 70" stroke="#FFA500" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 50H30M70 50H80M50 20V30M50 70V80" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Pan-India",
    description: "Coverage across all major Indian cities with 15,000+ serviceable PIN codes*",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <path d="M20 80L50 20L80 80H20Z" fill="#1E3A8A" />
        <circle cx="50" cy="40" r="10" fill="#FFA500" />
        <path d="M40 70H60L50 80L40 70Z" fill="#FFA500" />
      </svg>
    ),
  },
  {
    title: "Loans for\nany car",
    description: "Get a loan for pre-owned cars up to 14 years of age",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <rect width="80" height="60" rx="4" fill="#1E3A8A" />
        <rect x="10" y="10" width="60" height="10" rx="2" fill="#FFA500" />
        <rect x="10" y="30" width="60" height="10" rx="2" fill="#FFA500" />
        <circle cx="80" cy="80" r="20" fill="#FFA500" />
        <path d="M75 80H85M80 75V85" stroke="#1E3A8A" strokeWidth="4" />
      </svg>
    ),
  },
]

function Financing() {
  return (
    
    <div>
<div className="bg-gray-900 h-auto text-white p-8 flex flex-col md:flex-row items-center justify-between">
  {/* Left Section - Text Content */}
  <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
      Drive your dream car with ease – Quick <br />
      and <span className="text-orange-500">Simple Car Loans</span>
    </h1>
    <p className="text-gray-400 mb-6">
      Your dream car is just a quick loan away – approved in minutes!
    </p>
    
    {/* Loan Features */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <LoanFeature title="Get up to" value="0" subtitle="Down payment" />
      <LoanFeature title="Tenure up to" value="72" subtitle="Months" />
      <LoanFeature title="Interest from" value="12%" subtitle="p.a." />
    </div>
    
    {/* Button */}
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
      Check eligibility in 2 min
    </button>
  </div>

  {/* Right Section - Image */}
  <div className="md:w-1/2 w-full">
    <img
      src={f1}
      alt="Car Loan Illustration"
      className="w-full h-auto max-w-sm mx-auto md:max-w-md"
    />
  </div>
</div>




<div className="bg-gray-700 h-full text-white p-8 flex flex-col md:flex-row items-center justify-between">
  {/* Left Section - Heading */}
  <div className="md:w-1/4 w-full mb-8 md:mb-0 text-center md:text-left">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
      Financing by <br />
      <span className="text-orange-500">CarsNagpur</span>
    </h1>
  </div>

  {/* Right Section - Paragraphs */}
  <div className="md:w-3/4 w-full text-center md:text-left">
    <p className="mb-4 text-sm leading-relaxed">
      Finance your dream car the way you want! Secure a pre-owned car loan up to Zero down payment, loan tenures of up to 6 years,
      and up to 100% on-road financing. Say goodbye to the hassles of paperwork—we'll give you a loan offer in minutes with same-day, paperless approval.
    </p>
    <p className="text-sm leading-relaxed">
      Regardless of your profession or background, our loan offers extend to individuals with incomes as low as ₹15,000/month. Get 360° support during the loan process and after, and discover the joy of owning your own car.
    </p>
  </div>
</div>


<br/>
<br/>



<div className="bg-white max-w-full md:max-w-3xl lg:max-w-5xl mx-auto font-sans p-6">
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
    <span className="text-[#ff7043]">Eligibility criteria</span>{' '}
    <span className="text-[#1e3a8a]">and documents required</span>
  </h2>

  {/* Grid Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
    {[
      {
        icon: <UserCircle className="w-12 h-12 text-[#ff7043]" />,
        title: 'Profile',
        description: 'Indian nationals aged between 21-65 years',
      },
      {
        icon: <FileText className="w-12 h-12 text-[#ff7043]" />,
        title: 'Documents',
        description: 'Aadhaar/Passport/Voter ID, PAN and Bank statement',
      },
      {
        icon: <Briefcase className="w-12 h-12 text-[#ff7043]" />,
        title: 'Employment',
        description: 'Salaried/Self-employed Monthly income > ₹15,000',
      },
    ].map((item, index) => (
      <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff7043] opacity-10 transform rotate-45 translate-x-8 -translate-y-8"></div>
        <div className="relative z-10">
          {item.icon}
          <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Button Section */}
  <div className="flex justify-center mt-8">
  <button className="bg-[#ff7043] text-white font-bold py-3 px-12 rounded-full hover:bg-[#ff5722] transition duration-300">
    KNOW MORE
  </button>
</div>

</div>

      
<br/>

<div className='bg-gray-200'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Used car loan <span className="text-orange-500">interest and charges</span>
          </h1>
          <p className="text-lg text-gray-600">
            We have outlined the various charges that might be applicable when applying for or availing a used car loan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Pre-sales charges",
                description: "These are expenses and fees that are incurred before the actual sale or purchase of a used vehicle"
              },
              {
                title: "Post-sales charges",
                description: "These refer to the expenses and fees incurred after the sale or purchase of a vehicle has been completed"
              },
              {
                title: "Collection and legal charges",
                description: "These charges are applicable when a car is repossessed by the lender in case of a loan default"
              },
              {
                title: "Miscellaneous charges & fees",
                description: "There are certain miscellaneous charges and fees that may apply during a used car loan process"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
  <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300">
    KNOW MORE
  </button>
</div>

        </div>
        <div className="relative h-96 lg:h-full">
          {/* <div className="absolute inset-0 bg-orange-100 rounded-3xl overflow-hidden">
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
              <div className="relative h-full">
                <ArrowUpRight className="absolute top-1/4 left-1/4 text-orange-500 w-16 h-16 transform -rotate-45" />
                <Coins className="absolute bottom-1/4 right-1/4 text-orange-400 w-12 h-12" />
                <BarChart3 className="absolute top-1/2 right-1/3 text-orange-300 w-10 h-10" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-orange-500 transform skew-x-6" />
                <div className="absolute bottom-0 left-1/4 w-16 h-32 bg-orange-400 rounded-t-lg" />
                <div className="absolute bottom-0 left-1/2 w-16 h-48 bg-orange-300 rounded-t-lg" />
                <div className="absolute bottom-0 left-3/4 w-16 h-24 bg-orange-200 rounded-t-lg" />
              </div>
            </div>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-900 rounded-full" />
            </div>
          </div> */}

        <div className="md:w-8/6 mt-[80px] ">
        <img
          src={f2}
          // alt="Car Loan Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>

        </div>
      </div> 
    </div>

    </div>
           
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Why choose <span className="text-orange-500">CarsNagpur</span> loans?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-navy-900 whitespace-pre-line">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>


           
    </div>









  )
}

export default Financing