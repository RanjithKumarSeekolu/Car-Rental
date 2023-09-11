import React, { useState } from "react";
import { Cars, locations } from "../../utils/Cars";

const Booking = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [selectedPickUpDate, setSelectedPickUpDate] = useState(currentDate);
  const [selectedPickUpTime, setSelectedPickUpTime] = useState("12:00");
  const [selectedDropOffDate, setSelectedDropOffDate] = useState(currentDate);
  const [differentLocation, setDifferentLocation] = useState(false);

  return (
    <div
      className="rounded-lg mx-24 shadow-lg p-8 mt-24 border-b-8 border-indigo-800"
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
              placeholder="Enter Location"
            />
            <div
              onClick={() => setDifferentLocation((prev) => !prev)}
              className="cursor-pointer absolute top-5 right-4 text-blue-500 underline"
            >
              {differentLocation
                ? "Same Return Location"
                : "Different Return Location"}
            </div>
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
                placeholder="Enter Location"
              />
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
          <button className=" bg-indigo-800 text-lg px-5 py-2 text-white font-bold mt-5 rounded-lg shadow-md hover:shadow-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
