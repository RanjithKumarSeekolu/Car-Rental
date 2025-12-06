import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const DashboardListings = () => {
  // Mock Data
  const listings = [
    {
       id: 101,
       make: "Honda",
       model: "City",
       year: 2022,
       price: 2000,
       image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?isig=0&q=75",
       status: "Active"
    },
    {
       id: 102,
       make: "Maruti Suzuki",
       model: "Swift",
       year: 2021,
       price: 1500,
       image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/162799/swift-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
       status: "In Review"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
        <Link to="/carHost">
            <Button variant="primary">
                + Add New Car
            </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((car) => (
            <div key={car.id} className="bg-white border boundary-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative">
                    <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-100">
                        {car.status}
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{car.make} {car.model}</h3>
                            <p className="text-gray-500 text-sm">{car.year}</p>
                        </div>
                        <p className="text-indigo-600 font-bold">₹ {car.price}<span className="text-xs text-gray-400 font-normal">/day</span></p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            Edit
                        </button>
                        <button className="flex-1 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        ))}
        
        {/* Empty State / Add New Placeholder */}
        <Link to="/carHost" className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-gray-50 transition-all min-h-[300px] cursor-pointer">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
             </svg>
             <span className="font-medium">List Another Car</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardListings;
