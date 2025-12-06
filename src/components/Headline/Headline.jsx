import React from "react";
import map from "../../assets/backdrop.png";
import car from "../../assets/car.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Headline = () => {
  return (
    <div className="grid grid-cols-1 pb-8 md:grid-cols-2 gap-8 pt-28 md:pt-10 px-[5%] items-center overflow-hidden min-h-0 md:min-h-[75vh]">
      <div className="flex flex-col justify-center z-10">
        <div className="text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold text-left text-gray-900 dark:text-white"
          >
            Find Your Ideal Car Rental
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold my-6 text-left leading-tight text-gray-900 dark:text-white"
          >
            Easy <span className="text-blue-800 dark:text-blue-400">Renting</span> and
            <br />
            Secure car <span className="text-blue-800 dark:text-blue-400">Hosting</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 mb-8 text-lg text-left"
          >
            Search and discover the best car rental options with ease.
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <button className="bg-blue-800 dark:bg-blue-700 py-3 px-5 font-bold text-white hover:scale-105 transition-transform duration-200 rounded-sm">
            Find your best match
          </button>
          <Link to="carHost">
            <button className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold py-3 px-8 flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 rounded-sm">
              Host Your Car
              <img
                className="pl-2 dark:invert" 
                width="25"
                height="20"
                src="https://img.icons8.com/ios-filled/100/car-rental.png"
                alt="car-rental"
              />
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="hidden md:flex relative justify-center md:justify-end mt-8 md:mt-0 scale-[1.2]">
        <motion.img 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-[600px] h-auto object-contain dark:brightness-90 transition-[filter] duration-300" 
          src={car} 
          alt="car" 
        />
      </div>
    </div>
  );
};

export default Headline;
