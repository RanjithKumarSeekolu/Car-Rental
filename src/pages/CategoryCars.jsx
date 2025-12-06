import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import location from "../assets/location.gif";
import Footer from "../components/Footer/Footer";
import Shimmer from "../components/Shimmer/Shimmer";
import apiUrl from "../utils/Constants.js";

const CategoryCars = () => {
  const { id } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}cars/getCategoryCars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCars(data.data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-28 px-[5%] pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
          {cars.cars.map((car, car_index) => {
            return (
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      src={car.image_url}
                      alt="car img"
                    />
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {car.make} {car.model} {car.year}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400 text-sm">
                                <span className="w-4 h-4 opacity-70">
                                    <img src={location} alt="location" className="w-full h-full object-contain dark:invert" />
                                </span>
                                <span>{car.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="flex items-center justify-end gap-1">
                                <img
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/color/48/rupee--v1.png"
                                    alt="rupee"
                                />
                                <span className="font-bold text-lg text-gray-900 dark:text-white">
                                    {car.price_per_day}
                                </span>
                             </div>
                             <span className="text-xs text-gray-400">/day</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <div
                          className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
                            car_index == 0
                              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600 dark:hover:text-white"
                          }`}
                        >
                          {car_index == 0 && <span>&#x1F4DE;</span>}
                          <span> Book Now</span>
                        </div>
                      </div>
                  </div>
                </div>
            );
          })}
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryCars;
