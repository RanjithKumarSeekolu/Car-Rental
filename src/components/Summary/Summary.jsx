import React from "react";
import cars from "../../assets/cars.jpg";

const Summary = () => {
  return (
    <div className="flex px-[6%] py-24 flex-row flex-wrap flex-grow bg-white dark:bg-gray-900 transition-colors duration-300 justify-center gap-12 items-center">
      <div className="flex-1 min-w-[300px] max-w-[600px]">
        <img src={cars} alt="cars" className="rounded-xl w-full h-auto shadow-2xl dark:shadow-indigo-900/20 opacity-90 dark:opacity-80 transition-opacity" />
      </div>
      <div className="flex flex-col text-left flex-1 min-w-[300px]">
        <div className="text-blue-800 dark:text-blue-400 font-semibold py-2 text-2xl">
          About Us
        </div>
        <div className="font-bold text-3xl pb-6 leading-tight text-gray-900 dark:text-white">
          More than 150+ special collection <br className="hidden md:block"/> cars
        </div>
        <div className="text-gray-600 dark:text-gray-300 pb-8 text-lg leading-relaxed">
          Get the car of your dreams with the installments of your 
          choice. There are various attractive offers from Moladin 
          through our collaboration with various trusted leasing 
          partners.
        </div>
        <button className="bg-blue-800 dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-600 p-4 rounded-lg w-[200px] text-white font-bold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          See all cars
        </button>
      </div>
    </div>
  );
};

export default Summary;
