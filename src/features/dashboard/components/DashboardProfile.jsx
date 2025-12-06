import React from 'react';
import Button from '../../../components/ui/Button';

const DashboardProfile = ({ user }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 transition-colors">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
            <Button variant="outline" size="sm">Edit</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.displayName || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.email || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">+91 98765 43210</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</label>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Bangalore, India</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 transition-colors">
            <h3 className="text-indigo-900 dark:text-indigo-300 font-semibold mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">12</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800 transition-colors">
            <h3 className="text-green-900 dark:text-green-300 font-semibold mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹ 45,000</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800 transition-colors">
            <h3 className="text-purple-900 dark:text-purple-300 font-semibold mb-2">Cars Hosted</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
