import React from "react";
import cars from "../../assets/cars.jpg";

const Summary = () => {
  return (
    <div className="flex px-[6%] py-24 flex-row flex-wrap flex-grow">
      <div>
        <img src={cars} alt="cars" className="rounded-md w-[90%] h-[90%]" />
      </div>
      <div className="flex flex-col">
        <div className="text-blue-800 font-semibold py-2 text-2xl">
          About Us
        </div>
        <div className="font-bold text-3xl pb-4">
          More than 150+ special collection
          <br /> cars
        </div>
        <div className="text-gray-600 pb-4">
          Get the car of your dreams with the installments of your
          <br /> choice. There are various attractive offers from Moladin
          <br /> through our collaboration with various trusted leasing
          <br /> partners.
        </div>
        <button className="bg-blue-800 p-4 rounded-md span w-[200px] text-white font-bold">
          See all cars
        </button>
      </div>
    </div>
  );
};

export default Summary;
