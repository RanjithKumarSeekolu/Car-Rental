import React from "react";
// Import legacy components that haven't been refactored yet or move them too?
// For this overhaul, we'll keep some legacy components but wrap them in the new layout structure if necessary
// But simpler to just use the new Feature components.

import HeadlineContainer from "../components/Headline/HeadlineContainer"; 
import Summary from "../components/Summary/Summary";
import OurServices from "../components/OurServices/OurServices";
import Footer from "../components/Footer/Footer"; // Footer is in Layout now? No, Layout has Footer.
// So Landing Page implies content inside the Layout.

// New components
import BookingForm from "../features/booking/components/BookingForm";
import CarCollection from "../features/cars/components/CarCollection";
import ScrollAnimation from "../components/ui/ScrollAnimation";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

const Landing = () => {
  return (
    <>
      <HeadlineContainer />
      
      <ScrollAnimation>
        <BookingForm />
      </ScrollAnimation>
      
      <ScrollAnimation>
        <Summary />
      </ScrollAnimation>
      
      <ScrollAnimation>
        <OurServices />
      </ScrollAnimation>
      
      <ScrollAnimation>
        <CarCollection />
      </ScrollAnimation>

      <ScrollAnimation>
        <WhyChooseUs />
      </ScrollAnimation>
    </>
  );
};

export default Landing;
