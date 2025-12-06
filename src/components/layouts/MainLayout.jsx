import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useAuthStore from "../../store/useAuthStore";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
