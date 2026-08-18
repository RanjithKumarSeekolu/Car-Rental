import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import DashboardSidebar from "../features/dashboard/components/DashboardSidebar";
import DashboardOverview from "../features/dashboard/components/DashboardOverview";
import DashboardProfile from "../features/dashboard/components/DashboardProfile";
import DashboardBookings from "../features/dashboard/components/DashboardBookings";
import DashboardListings from "../features/dashboard/components/DashboardListings";
import AdminDashboard from "../features/admin/AdminDashboard";

const DashboardPage = () => {
  const { user, profile, loading, logout } = useAuthStore();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "profile" ? "profile" : "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  if (loading || (user && !profile)) {
    return (
      <div className="min-h-screen pt-28 bg-[var(--bg)]">
        <Loader label="Loading dashboard..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-2">Sign in required</h2>
          <p className="text-[var(--muted)] mb-6">Please log in to view your dashboard.</p>
          <Link to="/login">
            <Button variant="primary">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (profile?.role === "admin") {
    return <AdminDashboard
      user={{
        displayName: profile.displayName || user.displayName,
        email: user.email,
        photoURL: profile.photoURL || user.photoURL,
        metadata: user.metadata,
      }}
      logout={logout}
    />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "profile":
        return <DashboardProfile user={user} />;
      case "bookings":
        return <DashboardBookings />;
      case "listings":
        return <DashboardListings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-12 pt-28">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ink)]">My Dashboard</h1>
          <p className="text-[var(--muted)] mt-1">Manage your account, bookings, and listings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DashboardSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={user}
              logout={logout}
            />
          </div>
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
