import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Loader from "./components/ui/Loader";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Lazy Load Pages
const Landing = lazy(() => import("./pages/Landing"));
const AllCars = lazy(() => import("./pages/AllCars"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CarHost = lazy(() => import("./pages/CarHost"));
const CategoryCars = lazy(() => import("./pages/CategoryCars"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BookingPage = lazy(() => import("./pages/BookingPage"));

const PageWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PageWrapper><Landing /></PageWrapper>,
      },
      {
        path: "/allCars",
        element: <PageWrapper><AllCars /></PageWrapper>,
      },
      {
        path: "/about-us",
        element: <PageWrapper><About /></PageWrapper>,
      },
      {
        path: "/contact-us",
        element: <PageWrapper><Contact /></PageWrapper>,
      },
      {
        path: "/dashboard",
        element: <PageWrapper><Dashboard /></PageWrapper>,
      },
      {
        path: "/carHost",
        element: <PageWrapper><CarHost /></PageWrapper>,
      },
      {
        path: "/allCars/:id",
        element: <PageWrapper><CategoryCars /></PageWrapper>,
      },
      {
        path: "/booking/:carId",
        element: <PageWrapper><BookingPage /></PageWrapper>,
      },
      {
        path: "/registerUser",
        element: <PageWrapper><Register /></PageWrapper>,
      },
      {
        path: "*",
        element: <PageWrapper><NotFound /></PageWrapper>,
      },
    ],
  },
]);