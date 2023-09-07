import React, { useState } from "react";
import { Cars, locations } from "../../utils/Cars";

const Booking = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [selectedPickUpDate, setSelectedPickUpDate] = useState(currentDate);
  const [selectedDropOffDate, setSelectedDropOffDate] = useState(currentDate);
  const [differentLocation, setDifferentLocation] = useState(false);
  const ApiKey = "AIzaSyAZtGLDQk2wp46GopSGD_qdE2V4DPND3Js";
  return (
    <div
      className="rounded-lg mx-14 shadow-lg p-8 mt-24 border-b-8 border-indigo-800"
      style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex justify-between flex-wrap items-center">
        <div>
          <div className="text-lg font-medium mb-1">
            Pick-up Location <span className="text-red-500">*</span>
          </div>
          <select className="border rounded-lg border-gray-300 text-gray-400 text-lg outline-none p-3">
            <option value="">Pick-up location</option>
            {locations.map((location, index) => {
              return (
                <option value={location} key={index}>
                  {location}
                </option>
              );
            })}
          </select>
          <div
            onClick={() => setDifferentLocation((prev) => !prev)}
            className="cursor-pointer"
          >
            <input
              type="checkbox"
              className="mt-2 cursor-pointer"
              checked={differentLocation}
            />{" "}
            Return to different location
          </div>
        </div>
        {differentLocation && (
          <div>
            <div className="text-lg font-medium mb-1">
              Drop-Off Location <span className="text-red-500">*</span>
            </div>
            <select className="border rounded-lg border-gray-300 text-gray-400 text-lg outline-none p-3">
              <option value="">Select drop off location</option>
              {locations.map((location, index) => {
                return (
                  <option value={location} key={index}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div>
          <div>
            <div className="text-lg font-medium mb-1">
              Pick-Up Date <span className="text-red-500">*</span>
            </div>
            <input
              type="date"
              className="border rounded-lg border-gray-300 text-gray-400 font-rubik text-lg font-normal outline-none p-3 px-10"
              value={selectedPickUpDate}
              onChange={(e) => setSelectedPickUpDate(e.target.value)}
              min={currentDate}
            />
          </div>
        </div>
        <div>
          <div>
            <div className="text-lg font-medium mb-1">
              Drop-Off Date <span className="text-red-500">*</span>
            </div>
            <input
              type="date"
              className="border rounded-lg border-gray-300 text-gray-400 font-rubik text-lg font-normal outline-none p-3 px-10"
              value={selectedDropOffDate}
              onChange={(e) => setSelectedDropOffDate(e.target.value)}
              min={selectedPickUpDate}
            />
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
