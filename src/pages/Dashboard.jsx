import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Container from "../components/ui/Container";
import DashboardSidebar from "../features/dashboard/components/DashboardSidebar";
import DashboardProfile from "../features/dashboard/components/DashboardProfile";
import DashboardBookings from "../features/dashboard/components/DashboardBookings";
import DashboardListings from "../features/dashboard/components/DashboardListings";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  // Guard clause if user is not logged in? 
  // Ideally this page should be protected by a route guard, but visual fallback is okay for now.
  if (!user) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                  <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
                  <a href="/" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Go Home</a>
              </div>
          </div>
      )
  }

  const renderContent = () => {
      switch(activeTab) {
          case 'profile': return <DashboardProfile user={user} />;
          case 'bookings': return <DashboardBookings />;
          case 'listings': return <DashboardListings />;
          default: return <DashboardProfile user={user} />;
      }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-12 pt-22 transition-colors duration-300">
      <Container>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account, bookings, and listings from here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
                <DashboardSidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    user={user} 
                    logout={logout}
                />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
                {renderContent()}
            </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
