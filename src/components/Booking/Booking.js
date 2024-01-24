import React, { useState, useEffect } from "react";
import { Cars, locations } from "../../utils/Cars";
import { getLocations } from "../services/locations.services";

const Booking = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState("");
  const [selectedPickUpDate, setSelectedPickUpDate] = useState(currentDate);
  const [selectedPickUpTime, setSelectedPickUpTime] = useState("12:00");
  const [selectedDropOffDate, setSelectedDropOffDate] = useState(currentDate);
  const [selectedDropOffTime, setSelectedDropOffTime] = useState("12:00");
  const [differentLocation, setDifferentLocation] = useState(false);
  const [carRentalLocations, setCarRentalLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredDropOffLocations, setFilteredDropOffLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getLocations();

        setCarRentalLocations(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pickUpLocation) {
      const filtered = carRentalLocations.filter((location, index) => {
        return location.name
          .toLowerCase()
          .includes(pickUpLocation.toLocaleLowerCase());
      });
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [pickUpLocation]);

  useEffect(() => {
    if (dropOffLocation) {
      const filtered = carRentalLocations.filter((location, index) => {
        return location.name
          .toLowerCase()
          .includes(dropOffLocation.toLocaleLowerCase());
      });
      setFilteredDropOffLocations(filtered);
    } else {
      setFilteredDropOffLocations([]);
    }
  }, [dropOffLocation]);

  const locationSelectHandler = (location) => {
    setSelectedPickUpLocation(location); // Set the selected location
    setPickUpLocation(""); // Set the location's name in the input
    setFilteredLocations([]); // Clear the filtered locations when a location is selected
  };

  const dropOffLocationSelectHandler = (location) => {
    setSelectedDropOffLocation(location); // Set the selected location
    setDropOffLocation(""); // Set the location's name in the input
    setFilteredDropOffLocations([]); // Clear the filtered locations when a location is selected
  };

  const searchHandler = () => {
    const data = {
      selectedPickUpLocation,
      selectedDropOffLocation,
      selectedPickUpDate,
      selectedDropOffDate,
      selectedPickUpTime,
      selectedDropOffTime,
    };
  };

  return (
    <div className="pt-10 px-[5%]">
      <div
        className="rounded-lg w-full shadow-lg p-8 border-b-8 border-indigo-800"
        style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="flex justify-between flex-wrap items-center flex-grow">
          <div className="w-full">
            <div class="relative">
              <span class="absolute top-0 left-2 font-medium text-amber-900 text-lg">
                Pick-up Location <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                class="border border-black pt-8 pb-2 pl-2 w-full text-xl bg-customGray"
                value={
                  selectedPickUpLocation
                    ? selectedPickUpLocation.name
                    : pickUpLocation
                }
                placeholder="Enter Location"
                onChange={(e) => setPickUpLocation(e.target.value)}
                // onBlur={() => setFilteredLocations([])}
              />
              {selectedPickUpLocation && (
                <button
                  onClick={() => {
                    setSelectedPickUpLocation("");
                    setPickUpLocation("");
                  }}
                  className="absolute top-[-4px] px-3 right-1 font-bold text-red-500 text-lg cursor-pointer"
                >
                  x
                </button>
              )}
              <div
                onClick={() => setDifferentLocation((prev) => !prev)}
                className="cursor-pointer absolute top-5 right-4 text-blue-500 underline"
              >
                {differentLocation
                  ? "Same Return Location"
                  : "Different Return Location"}
              </div>
              {filteredLocations.length > 0 && (
                <ul className="bg-white position absolute z-10 w-full p-5">
                  {filteredLocations.map((location, index) => (
                    <li
                      className="border-gray-400 border-b p-2 text-lg cursor-pointer"
                      key={index}
                      onClick={() => locationSelectHandler(location)}
                    >
                      {location.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {differentLocation && (
            <div className="w-full mt-2">
              <div class="relative">
                <span class="absolute top-0 left-2 font-medium text-amber-900 text-lg">
                  Drop-off Location <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  class="border border-black pt-8 pb-2 pl-2 w-full text-xl bg-customGray"
                  value={
                    selectedDropOffLocation
                      ? selectedDropOffLocation.name
                      : dropOffLocation
                  }
                  placeholder="Enter Location"
                  onChange={(e) => setDropOffLocation(e.target.value)}
                />
                {selectedDropOffLocation && (
                  <button
                    onClick={() => {
                      setSelectedDropOffLocation("");
                      setDropOffLocation("");
                    }}
                    className="absolute top-[-4px] px-3 right-1 font-bold text-red-500 text-lg cursor-pointer"
                  >
                    x
                  </button>
                )}
                {filteredDropOffLocations.length > 0 && (
                  <ul className="bg-white position absolute z-10 w-full p-5">
                    {filteredDropOffLocations.map((location, index) => (
                      <li
                        className="border-gray-400 border-b p-2 text-lg cursor-pointer"
                        key={index}
                        onClick={() => dropOffLocationSelectHandler(location)}
                      >
                        {location.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          <div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-2 text-lg font-medium mb-1">
                Pick-Up<span className="text-red-500">*</span>
              </div>
              <div className="flex">
                <input
                  type="date"
                  className="border-t border-b border-l border-black pt-8 pb-2 pl-2 pr-2 bg-customGray"
                  value={selectedPickUpDate}
                  onChange={(e) => setSelectedPickUpDate(e.target.value)}
                  min={currentDate}
                />
                <input
                  type="time"
                  className="border border-black pt-8 pb-2 pl-2 pr-2 bg-customGray"
                  value={selectedPickUpTime}
                  onChange={(e) => setSelectedPickUpTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-2 text-lg font-medium mb-1">
                Drop-off<span className="text-red-500">*</span>
              </div>
              <div className="flex">
                <input
                  type="date"
                  className="border-t border-b border-l border-black pt-8 pb-2 pl-2 pr-2 bg-customGray"
                  value={selectedDropOffDate}
                  onChange={(e) => setSelectedDropOffDate(e.target.value)}
                  min={currentDate}
                />
                <input
                  type="time"
                  className="border border-black pt-8 pb-2 pl-2 pr-2 bg-customGray"
                  value={selectedDropOffTime}
                  onChange={(e) => setSelectedDropOffTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => searchHandler()}
              className=" bg-indigo-800 text-lg px-10 py-5 text-white font-bold mt-2 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
