import React from "react";

const services = [
  {
    image: "https://img.icons8.com/bubbles/500/000000/car.png",
    heading: "Select a Car",
    description:
      "We provide an extensive selection of vehicles catering to all your driving requirements. Our fleet offers the ideal car to suit your specific needs.",
  },
  {
    image: "https://img.icons8.com/bubbles/500/000000/user.png",
    heading: "Contact Operator",
    description:
      "Our dedicated and amiable operators are available at all times, prepared to assist you with any inquiries or issues you may have.",
  },
  {
    image:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/500/external-lease-automotive-dealership-flaticons-lineal-color-flat-icons-6.png",
    heading: "Drive your car",
    description:
      "Whether you're embarking on a road trip or any other journey, rest assured that our diverse array of cars has your transportation needs fully covered.",
  },
];

const OurServices = () => {
  return (
    <>
      <div>
        <div className="text-blue-800 text-2xl font-semibold text-center">
          Plan your journey now
        </div>
        <div className="font-bold text-4xl text-center">
          Speedy Car Renting Solution
        </div>
      </div>

      <div className="flex justify-around flex-col md:flex-row">
        {services.map((service, index) => {
          return (
            <div className="flex flex-col items-center p-12" key={index}>
              <div>
                <img
                  src={service.image}
                  alt="service"
                  width="170"
                  height="170"
                />
              </div>
              <div className="text-center font-bold text-2xl mb-2">
                {service.heading}
              </div>
              <div className="text-center text-gray-600">
                {service.description}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OurServices;
