import { Car, Shield, Clock, Users, Award, ThumbsUp } from 'lucide-react';

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 bg-cover h-[500px] text-white "style={{ backgroundImage: "url('https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg')" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 ml-[40px]">
          <h1 className="text-4xl font-bold  ">About CarsNagpur</h1>
          <p className="text-xl mb-8">Revolutionizing the way Nagpur buys and sells cars</p>
          <Button className="bg-white text-orange-600 hover:bg-orange-50">Learn More</Button>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className=" text-blue-900 text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Founded in 2024, CarsNagpur started with a simple mission: to make buying and selling cars in Nagpur as easy as ordering food online. We recognized the challenges faced by both buyers and sellers in the traditional car market and set out to create a platform that would revolutionize the industry.
            </p>
            <p className="text-gray-600">
              Today, we're proud to be Nagpur's leading online marketplace for cars, connecting thousands of buyers and sellers every month. Our commitment to transparency, security, and customer satisfaction has made us the go-to platform for anyone looking to buy or sell a car in Nagpur.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://armormax.com/wp-content/uploads/2022/03/Car-selling-2.png" alt="CarsNagpur Team" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className=" text-blue-900 text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
            To provide a seamless, transparent, and secure platform for buying and selling cars in Nagpur, empowering our community with choice, convenience, and confidence in every transaction.
          </p>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className=" text-blue-900 text-3xl font-bold text-center mb-12">Why Choose CarsNagpur</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Secure Transactions", description: "Our escrow service ensures your money is protected until you're satisfied with your purchase." },
            { icon: Clock, title: "Quick & Easy", description: "List your car or find your dream vehicle in minutes with our user-friendly interface." },
            { icon: Users, title: "Large Community", description: "Access Nagpur's largest community of car buyers and sellers all in one place." },
            { icon: Award, title: "Quality Assurance", description: "All listed vehicles undergo a rigorous verification process to ensure quality and authenticity." },
            { icon: ThumbsUp, title: "Customer Support", description: "Our dedicated support team is always ready to assist you with any queries or concerns." },
            { icon: Car, title: "Wide Selection", description: "From budget-friendly options to luxury vehicles, find the perfect car for your needs." },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-300 py-16 mb-[60px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12  text-blue-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Sanjana Kashimkar", role: "Founder & CEO", image: "https://media.licdn.com/dms/image/D4D22AQE5FTz3xeOiXg/feedshare-shrink_800/0/1712828707941?e=2147483647&v=beta&t=DEV5z3UpMVryMPCuWMa4RMBWw9HMo6LNkldiaDwUTJk" },
              { name: "Muskan Burde", role: "COO", image: "https://media.licdn.com/dms/image/D4D03AQF1sbSwVQ2ULg/profile-displayphoto-shrink_400_400/0/1718036639670?e=2147483647&v=beta&t=U4YIL0XDDvQETjDUo1HWIbSIX0OVrUAMovnmn5xVdOQ" },
              { name: "Gaurav Mohadikar", role: "CTO", image: "https://pbs.twimg.com/media/GQWMc3oXgAEazIC?format=jpg&name=large" },
              { name: "Sharda Waghmare", role: "Head of Customer Experience", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN76Ydr5gjuqpYUh5TTcp89opJ_oWElUe9oQ&s" },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4" />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-300 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4  text-blue-900">Ready to get started?</h2>
          <p className="text-xl mb-8  text-blue-900">Join thousands of satisfied customers in Nagpur who have found their perfect car through CarsNagpur.</p>
          <Button className="bg-white text-orange-600 hover:bg-orange-50">Browse Cars Now</Button>
        </div>
      </div>
    </div>
  );
}

export default About;
