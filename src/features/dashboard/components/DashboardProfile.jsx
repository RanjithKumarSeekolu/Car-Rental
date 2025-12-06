import React from 'react';
import Button from '../../../components/ui/Button';

const DashboardProfile = ({ user }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <Button variant="outline" size="sm">Edit</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <p className="text-lg font-medium text-gray-900">{user?.displayName || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <p className="text-lg font-medium text-gray-900">{user?.email || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                <p className="text-lg font-medium text-gray-900">+91 98765 43210</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                <p className="text-lg font-medium text-gray-900">Bangalore, India</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-indigo-900 font-semibold mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-indigo-600">12</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-green-900 font-semibold mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">₹ 45,000</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-purple-900 font-semibold mb-2">Cars Hosted</h3>
            <p className="text-3xl font-bold text-purple-600">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
