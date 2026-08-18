import React from 'react';

const DashboardSidebar = ({ activeTab, setActiveTab, user, logout }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'listings', label: 'My Listings' },
    { id: 'profile', label: 'My Profile' },
  ];

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] p-6 h-full min-h-[500px]">
      <div className="flex flex-col items-center mb-10">
        <img
          src={user?.photoURL || "https://img.icons8.com/ios-filled/100/user-male-circle.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-[var(--bg)] mb-4"
        />
        <h3 className="text-xl font-bold text-[var(--ink)]">{user?.displayName || "User"}</h3>
        <p className="text-sm text-[var(--muted)] text-center break-all">{user?.email}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-[var(--radius-sm)] font-medium transition-all ${
              activeTab === item.id
                ? 'btn-navy'
                : 'text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-10 pt-8 border-t border-[var(--line)]">
        <button
          onClick={logout}
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
