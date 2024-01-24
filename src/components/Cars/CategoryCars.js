import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import location from "../../assets/location.gif";
import Footer from "../Footer/Footer";
import Shimmer from "../Shimmer/Shimmer";
import apiUrl from "../../utils/Constants.js";

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
        <div className="flex flex-wrap pt-28 px-14">
          {cars.cars.map((car, car_index) => {
            return (
              <div
                key={car.id}
                className="flex flex-col flex-grow box-border px-10 py-10 w-[350px]"
              >
                <div>
                  <img
                    className="h-[160px]"
                    src={car.image_url}
                    alt="car img"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <img
                      className="center"
                      width="30"
                      height="30"
                      src="https://img.icons8.com/color/48/rupee--v1.png"
                      alt="rupee--v1"
                    />
                    <span className="font-bold text-lg">
                      {car.price_per_day}
                    </span>
                    <span className="text-gray-400"> /days</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-[20px] h-[20px]">
                      <img src={location} alt="location" />
                    </span>
                    <span className="text-gray-400">{car.location}</span>
                  </div>
                </div>
                <div className="font-bold text-lg py-2">
                  {"  " + car.make + " "}
                  {car.model + " "}
                  {car.year}
                </div>
                <div
                  className={`flex items-center justify-center rounded-sm text-center p-2 ${
                    car_index == 0
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-blue-600 hover:text-white"
                  } `}
                >
                  {car_index == 0 && <span>&#x1F4DE;</span>}
                  <span> Book Now</span>
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
