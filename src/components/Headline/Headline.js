import React from "react";
import map from "../../assets/backdrop.png";
import car from "../../assets/car.png";
import { Link } from "react-router-dom";

const Headline = () => {
  return (
    <div className="flex flex-wrap pt-28 px-[5%]">
      <div className="pt-6">
        <div className="text-2xl font-bold">Find Your Ideal Car Rental</div>
        <div className="text-6xl font-bold my-6">
          Easy <span className="text-blue-800">Renting</span> and
          <br />
          Secure car <span className="text-blue-800">Hosting</span>
        </div>
        <div className="text-gray-600 mb-8 text-lg">
          Search and discover the best car rental options with ease.
        </div>
        <div className="flex">
          <button className="bg-blue-800 py-3 px-5 mr-8 font-bold text-white">
            find your best match
          </button>
          <Link to="carHost">
            <button className="border-b-2 bg-gray-300 text-black font-bold py-3 px-8 flex items-center">
              Host Your Car
              <img
                className="pl-2"
                width="25"
                height="20"
                src="https://img.icons8.com/ios-filled/100/car-rental.png"
                alt="car-rental"
              />
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        {/* <img className="absolute top-0 right-0" src={map} alt="map" /> */}
        <img className="absolute w-[50%] ml-10" src={car} alt="car" />
      </div>
    </div>
  );
};

export default Headline;
