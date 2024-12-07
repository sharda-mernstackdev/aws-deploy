import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react'; // Use lucide-react for icons
import { Link } from 'react-router-dom';

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Challans', 'Service History', 'Pre-Delivery Inspection', 'Car Wash'];

  return (
    <div className="p-4 sm:p-8 bg-blue-50 min-h-[500px] sm:h-[650px]">
      <div className="flex items-center mb-4 sm:mb-6">
        <Link to="/home">
          <ChevronLeft className="h-6 w-6 text-gray-500" />
        </Link>
        <h1 className="text-lg sm:text-2xl font-bold text-blue-800 ml-2">My Orders</h1>
      </div>
      <div className="flex overflow-x-auto space-x-2 sm:space-x-4 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`whitespace-nowrap px-3 py-2 rounded-md text-xs sm:text-sm font-medium ${
              activeTab === tab
                ? 'bg-white border border-orange-500 text-orange-500'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Content for each tab can be added here */}
    </div>
  );
};

export default MyOrder;
