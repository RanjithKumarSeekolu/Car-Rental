import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../../utils/Constants.js";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}cars/getAllCars`);
        if (response.ok) {
          const data = await response.json();
          setCars(data);
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
    !loading && (
      <div>
        <div className="flex flex-col">
          <div className="flex justify-around bg-gray-300 pt-28 flex-wrap px-10">
            <div>
              <div className="font-bold text-2xl py-2">
                Not Sure which car is suitable for your trip?
              </div>
              <div>Car Finder can narrow down your choices.</div>
              <button className="p-2 text-white bg-black rounded-md my-10">
                find your best match
              </button>
            </div>
            <img
              className="w-[400px]"
              alt="car"
              src="https://firebasestorage.googleapis.com/v0/b/car-rental-3a89c.appspot.com/o/car%2Fcars.png?alt=media&token=ef52deec-8ed2-40eb-95de-4b2f0ea00e8a"
            />
          </div>
        </div>
        <div>
          <div className="p-10 border-b-2 font-bold text-4xl">
            Compare Rental Car Sizes and Classes
          </div>
          <div className="p-10">
            {cars.map((car_category, index) => {
              return (
                <div className="flex border-b-2 border-black py-10 justify-around w-full">
                  <div className="w-[60%]">
                    <div className="flex items-center py-2">
                      <div className="font-bold text-2xl">
                        {car_category.name}
                      </div>
                      <div className="pl-10 flex items-center">
                        <img
                          width="20"
                          height="20"
                          className="pr-1"
                          src="https://img.icons8.com/ios/100/car-seat.png"
                          alt="car-seat"
                        />
                        {`${car_category.seatingCapacity} people`}
                      </div>
                      <div className="pl-10 flex items-center">
                        <img
                          width="20"
                          height="20"
                          className="pr-1"
                          src="https://img.icons8.com/ios/100/bag-front-view.png"
                          alt="bag-front-view"
                        />
                        {` ${car_category.lagguageCapacity} bags`}
                      </div>
                    </div>
                    <div>{car_category.description}</div>
                    <Link to={`/allCars/${car_category.name}`}>
                      <button className="py-1 px-3 text-white bg-black rounded-md mt-3">{`View all ${car_category.cars.length} vehichles`}</button>
                    </Link>
                  </div>
                  <div className="w-[25%]">
                    <img src={car_category.image_url} className="h-[160px]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default AllCars;
