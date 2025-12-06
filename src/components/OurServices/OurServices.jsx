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
    <section className="py-12 dark:text-white">
      <div className="mb-12">
        <div className="text-blue-800 dark:text-blue-400 text-2xl font-semibold text-center mb-2">
          Plan your journey now
        </div>
        <div className="font-bold text-4xl text-center text-gray-900 dark:text-white">
          Speedy Car Renting Solution
        </div>
      </div>

      <div className="flex justify-around flex-col md:flex-row gap-8">
        {services.map((service, index) => {
          return (
            <div className="flex flex-col items-center p-8 text-center max-w-sm mx-auto" key={index}>
              <div className="mb-6">
                <img
                  src={service.image}
                  alt="service"
                  width="170"
                  height="170"
                  className="object-contain" // Add filter for dark mode if needed, but icons are colored.
                />
              </div>
              <div className="font-bold text-2xl mb-4 text-gray-900 dark:text-white">
                {service.heading}
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurServices;
