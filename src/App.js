import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Summary from "./components/Summary/Summary";
import Services from "./components/Services/Services";
import AvailableCars from "./components/Cars/AvailableCars";
import Footer from "./components/Footer/Footer";
import Booking from "./components/Booking/Booking";

const App = () => {
  return (
    <>
      <HeaderContainer />
      <Booking />
      <Summary />
      <Services />
      <AvailableCars />
      <Footer />
    </>
  );
};

export default App;
