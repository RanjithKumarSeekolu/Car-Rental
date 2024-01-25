import React from "react";
import Person1 from "../assets/Person1.png";
import Person2 from "../assets/Person2.png";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-400 py-20 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">About RentNHost</h1>
          <p className="text-lg">
            Your go-to platform for renting cars or hosting your own car.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Who We Are</h2>
          <p className="text-lg">
            We are passionate about providing a seamless experience for car
            renters and hosts alike. Our platform connects people looking for
            reliable transportation with those willing to share their cars.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          <div className="flex flex-wrap justify-center">
            <div className="m-4">
              <img
                src={Person1}
                alt="Team Member 1"
                className="rounded-full w-32 h-32 mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">CEO & Co-founder</p>
            </div>
            <div className="m-4">
              <img
                src={Person2}
                alt="Team Member 2"
                className="rounded-full w-32 h-32 mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold">Samantha</h3>
              <p className="text-gray-600">CTO & Co-founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-lg mb-4">
                "RentNHost made it so easy for me to find a car for my weekend
                trip. Highly recommended!"
              </p>
              <p className="text-gray-600 text-right">- Alice Johnson</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg mb-4">
                "I've been hosting my car on RentNHost for months now, and it's
                been a great way to earn extra income."
              </p>
              <p className="text-gray-600 text-right">- Michael Lee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <p className="text-lg text-center">
            If you have any questions or feedback, feel free to reach out to us
            at{" "}
            <a href="mailto:info@rentnhost.com" className="text-blue-500">
              info@rentnhost.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
