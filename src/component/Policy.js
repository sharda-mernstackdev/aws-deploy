import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export  function Policy() {
  const [activeSection, setActiveSection] = useState('General')

  const sections = [
    'General',
    'Your Consent',
    'Information',
    'Personal information',
    'Non-Personal information',
    'Types of information received',
    'Third Party Integration',
    'How we use your information',
    'Data Security',
    'Cookies Policy',
    'Children\'s Privacy',
    'Changes to this Policy',
    'Contact Us'
  ]

  const content = {
    'General': `The Platform is owned by CarsNagpur and aims to value your privacy and commits to protect information disclosed by you to the Company by means of using the Platform. Please read the Policy to understand the practices of the Company, and specifically with regards, as to how Company treats the information disclosed by you by using the domain and subdomains of our Platform.`,
    'Your Consent': `By using the CarsNagpur Platform and/or by providing your information, you consent to the collection and use of the information you disclose on the Platform in accordance with this Privacy Policy, including but not limited to your consent for sharing your information as per this privacy policy.`,
    'Information': `We collect various types of information to provide and improve our services to you. This includes information you provide directly, information collected automatically, and information from third-party sources.`,
    'Personal information': `Personal Information is information that can be used to identify you specifically, including your name, email address, phone number, or mailing address. We collect Personal Information when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or enter information on our site.`,
    'Non-Personal information': `Non-Personal Information is information that cannot be used to identify you specifically, including data from cookies, web beacons, and third-party sources. We collect Non-Personal Information to improve our services and user experience.`,
    'Types of information received': `The types of information we receive include but are not limited to: contact information, demographic information, browsing history, device information, location data, and transaction data.`,
    'Third Party Integration': `We may use third-party service providers to help us operate our business and the Platform or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.`,
    'How we use your information': `We use the information we collect to operate and improve our Platform, personalize your experience, provide customer service, process transactions, send periodic emails, and improve our marketing and promotional efforts.`,
    'Data Security': `We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.`,
    'Cookies Policy': `Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.`,
    'Children\'s Privacy': `We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.`,
    'Changes to this Policy': `CarsNagpur reserves the right to change this policy at any time. We will notify you of significant changes to our Privacy Policy by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site.`,
    'Contact Us': `If you have any questions regarding this Privacy Policy or the practices of this Platform, please contact us by sending an email to privacy@carsnagpur.com.`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
  className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-20 "
  style={{
    backgroundImage: 'url("https://i.pinimg.com/736x/10/a2/79/10a2795527d24cd23e07905c7aec2e1c.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
  }}
>
  <div className="container mx-auto px-4 ">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
    <p className="text-xl mb-8">Protecting Your Information is Our Priority</p>
    <div className="flex flex-wrap gap-4">
      <Link to="/sell-car">
        <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
          SELL CAR
        </button>
      </Link>
      <Link to="/usedcars">
        <button className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
          BUY CAR
        </button>
      </Link>
    </div>
  </div>
</section>


      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-6">Last updated on {new Date().toLocaleDateString()}</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-1/4">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {sections.map((section) => (
                <button
                  key={section}
                  className={`flex items-center justify-between p-2 rounded text-left ${
                    activeSection === section 
                      ? 'bg-[#0056b3] text-white' 
                      : 'bg-gray-100 text-[#2c3e50] hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                  <ChevronRight className={`w-4 h-4 ${activeSection === section ? 'text-white' : 'text-[#0056b3]'}`} />
                </button>
              ))}
            </div>
          </nav>
          
          <main className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">{activeSection}</h2>
            <div className="w-16 h-1 bg-orange-500 mb-6"></div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {content[activeSection]}
              </p>
              
              {activeSection === 'General' && (
                <>
                  <h3 className="text-xl font-semibold text-[#2c3e50] mt-6 mb-3">Our Commitment to Privacy</h3>
                  <p className="text-gray-700 mb-4">
                    At CarsNagpur, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your data when you use our Platform.
                  </p>
                  <h3 className="text-xl font-semibold text-[#2c3e50] mt-6 mb-3">Scope of this Policy</h3>
                  <p className="text-gray-700 mb-4">
                    This Policy applies to all services offered by CarsNagpur, including our website, mobile applications, and any other services that display or link to this Privacy Policy. It does not apply to services that have separate privacy policies that do not incorporate this Policy.
                  </p>
                </>
              )}
              
              {activeSection === 'Your Consent' && (
                <>
                  <h3 className="text-xl font-semibold text-[#2c3e50] mt-6 mb-3">How We Obtain Your Consent</h3>
                  <p className="text-gray-700 mb-4">
                    We obtain your consent in various ways, depending on the context. This may include:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Clicking an "I Agree" button or checking a box when registering for our services</li>
                    <li>Using our services after we've notified you of changes to this Policy</li>
                    <li>Providing information through our Platform</li>
                  </ul>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
export default Policy;
