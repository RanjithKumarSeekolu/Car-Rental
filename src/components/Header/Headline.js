import React from "react";
import map from "../../assets/backdrop.png";
import car from "../../assets/car.png";

const Headline = () => {
  return (
    <div className="flex flex-wrap pt-28 px-[6%]">
      <div className="pt-6">
        <div className="text-2xl font-bold">Find Your Ideal Car Rental</div>
        <div className="text-6xl font-bold my-6">
          Effortless <span className="text-blue-800">Renting</span> and
          <br />
          Secure car <span className="text-blue-800">Hosting</span>
        </div>
        <div className="text-gray-600 mb-8 text-lg">
          Search and discover the best car rental options with ease.
        </div>
        <div>
          <button className="bg-blue-800 py-3 px-8 mr-8 font-bold text-white">
            Book Now
          </button>
          <button className="border-b-2 border-black border-dotted font-bold">
            See all cars
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        {/* <img className="absolute top-0 right-0" src={map} alt="map" /> */}
        <img className="absolute w-[50%]" src={car} alt="car" />
      </div>
    </div>
  );
};

export default Headline;
