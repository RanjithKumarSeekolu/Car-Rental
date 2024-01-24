import React, { useState, useEffect } from "react";
import location from "../../assets/location.gif";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer";
import apiUrl from "../../utils/Constants";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [visibleCategories, setVisibleCategories] = useState(1);
  const [showCategoryCarsId, setShowCategoryCarsId] = useState(1);
  const [buttonClick, setButtonClick] = useState("");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}cars/getCars?limit=6`);
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          setIsLoading(false);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Error: " + error);
      }
    };
    getCars();
  }, []);

  const categoriesPerPage = {
    small: 1,
    medium: 2,
    large: 4,
  };

  const handleNextClick = () => {
    setSelectedCategory((prev) => (prev % cars.length) + 1);
    setButtonClick("next");
  };

  const handlePrevClick = () => {
    setSelectedCategory((prev) => {
      const nextCategory = prev - 1 <= 0 ? cars.length : prev - 1;
      return nextCategory;
    });

    setButtonClick("prev");
  };

  const updateVisibleCategories = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      setVisibleCategories(categoriesPerPage.large);
    } else if (screenWidth >= 768) {
      setVisibleCategories(categoriesPerPage.medium);
    } else {
      setVisibleCategories(categoriesPerPage.small);
    }
  };

  useEffect(() => {
    updateVisibleCategories();
    window.addEventListener("resize", updateVisibleCategories);
    return () => {
      window.removeEventListener("resize", updateVisibleCategories);
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    setShowCategoryCarsId(categoryId);
  };

  const visibleCategoryIds = [...Array(visibleCategories).keys()].map(
    (index) => ((selectedCategory - 1 + index) % cars.length) + 1
  );

  useEffect(() => {
    if (visibleCategoryIds.includes(showCategoryCarsId)) {
      return;
    } else if (buttonClick == "prev") {
      setShowCategoryCarsId(visibleCategoryIds[visibleCategoryIds.length - 1]);
    } else if (buttonClick == "next") {
      setShowCategoryCarsId(visibleCategoryIds[0]);
    }
  }, [visibleCategoryIds]);

  return (
    <div className="flex flex-col py-10">
      <div className="text-blue-800 text-2xl font-semibold text-center">
        Collection
      </div>
      <div className="font-bold text-4xl text-center">Our Collection Cars</div>
      {loading ? (
        <Shimmer />
      ) : (
        <div>
          <div className="flex items-center justify-center space-x-12 mx-[5%]">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/left-squared--v1.png"
              alt="left-squared--v1"
              onClick={handlePrevClick}
              className="relative top-4 cursor-pointer"
            />
            <div className="flex flex-1 justify-around border-b border-gray-300 text-gray-400 text-md">
              {visibleCategoryIds.map((categoryId) => {
                const category = cars.find((car) => car.id === categoryId);
                return (
                  <div
                    key={category.id}
                    className={`w-full text-center cursor-pointer ${
                      categoryId === showCategoryCarsId
                        ? "border-b-2 border-black text-black transition ease-in-out duration-300"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(categoryId)}
                  >
                    <span className="text-6xl relative top-3">&middot;</span>
                    {" " + category?.name}
                  </div>
                );
              })}
            </div>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/right-squared--v1.png"
              alt="right-squared--v1"
              className="relative top-4 cursor-pointer"
              onClick={handleNextClick}
            />
          </div>
          <div className="px-[5%]">
            {cars.map((car_category, category_index) => {
              if (car_category.id === showCategoryCarsId) {
                return (
                  <div key={car_category.id} className="flex flex-wrap">
                    {car_category.cars.map((car, car_index) => {
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
                              <span className="text-gray-400">
                                {car.location}
                              </span>
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
                                ? " bg-indigo-800 text-white"
                                : "bg-gray-200 hover:bg-indigo-800 hover:text-white"
                            } `}
                          >
                            {car_index == 0 && <span>&#x1F4DE;</span>}
                            <span> Book Now</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      <div className="text-center">
        <Link to="/allCars">
          <button className="bg-indigo-800 text-white my-5 p-2 px-4 rounded-sm font-medium">
            See all cars...
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableCars;
