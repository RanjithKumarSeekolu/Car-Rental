import React from "react";
import HeadlineContainer from "../components/Headline/HeadlineContainer";
import Summary from "../components/Summary/Summary";
import OurServices from "../components/OurServices/OurServices";
import BookingForm from "../features/booking/components/BookingForm";
import CarCollection from "../features/cars/components/CarCollection";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

const Landing = () => {
  return (
    <>
      <HeadlineContainer />
      <BookingForm />
      <OurServices />
      <CarCollection />
      <WhyChooseUs />
      <Summary />
    </>
  );
};

export default Landing;
