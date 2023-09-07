import React from "react";
import Headlinecontainer from "./components/Headline/HeadlineContainer";
import Header from "./components/Header/Header";
import Summary from "./components/Summary/Summary";
import OurServices from "./components/OurServices/OurServices";
import AvailableCars from "./components/Cars/AvailableCars";
import Footer from "./components/Footer/Footer";
import Booking from "./components/Booking/Booking";
import { createBrowserRouter, Outlet } from "react-router-dom";
import AllCars from "./components/Cars/AllCars";
import CarHost from "./components/CarHost/CarHost";
import CategoryCars from "./components/Cars/CategoryCars";
import path from "path-browserify";
import MapContainer from "./components/Maps/MapContainer";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Body = () => {
  return (
    <>
      <Headlinecontainer />
      <Booking />
      <Summary />
      <OurServices />
      <AvailableCars />
      <Footer />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: "/",
        element: <Body />,
      },
      {
        path: "/allCars",
        element: <AllCars />,
      },
      {
        path: "/carHost",
        element: <CarHost />,
      },
      {
        path: "/allCars/:id",
        element: <CategoryCars />,
      },
      {
        path: "/maps",
        element: <MapContainer />,
      },
    ],
  },
]);
