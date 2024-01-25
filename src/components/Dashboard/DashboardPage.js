import React from "react";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-20 bg-blue-400 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg">
            Welcome back, [User Name]! Here's an overview of your account.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <p className="text-lg">
                Update your profile information and preferences.
              </p>
              <a
                href="/profile"
                className="text-blue-400 font-medium mt-2 inline-block hover:underline"
              >
                Edit Profile
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Bookings</h2>
              <p className="text-lg">
                View and manage your car rental bookings.
              </p>
              <a
                href="/bookings"
                className="text-blue-400 font-medium mt-2 inline-block hover:underline"
              >
                View Bookings
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Hostings</h2>
              <p className="text-lg">
                Manage your car listings and host settings.
              </p>
              <a
                href="/hostings"
                className="text-blue-400 font-medium mt-2 inline-block hover:underline"
              >
                Manage Hostings
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Support</h2>
              <p className="text-lg">
                Contact customer support for assistance.
              </p>
              <a
                href="/support"
                className="text-blue-400 font-medium mt-2 inline-block hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
