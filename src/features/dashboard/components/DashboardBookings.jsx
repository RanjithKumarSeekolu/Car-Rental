import React from 'react';

const DashboardBookings = () => {
  // Mock Data
  const bookings = [
    {
      id: 1,
      car: "Toyota Fortuner",
      image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/44123/toyota-fortuner-right-front-three-quarter-7.jpeg?q=75",
      startDate: "Oct 12, 2023",
      endDate: "Oct 15, 2023",
      totalPrice: "₹ 12,000",
      status: "Completed",
      location: "Bangalore"
    },
    {
      id: 2,
      car: "Hyundai Creta",
      image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/141113/creta-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
      startDate: "Dec 05, 2023",
      endDate: "Dec 06, 2023",
      totalPrice: "₹ 4,500",
      status: "Active",
      location: "Bangalore"
    },
    {
      id: 3,
      car: "Mahindra Thar",
      image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75",
      startDate: "Jan 20, 2024",
      endDate: "Jan 22, 2024",
      totalPrice: "₹ 8,000",
      status: "Upcoming",
      location: "Mysore"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src={booking.image} alt={booking.car} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{booking.car}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${booking.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                                  booking.status === 'Active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                                {booking.status}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{booking.location}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                        <div className="text-sm">
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-900 dark:text-white">From:</span> {booking.startDate}</p>
                            <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-900 dark:text-white">To:</span> {booking.endDate}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-500 dark:text-gray-400">Total Price</p>
                             <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{booking.totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBookings;
