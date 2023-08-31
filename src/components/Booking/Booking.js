import React, { useState } from "react";
import { Cars, locations } from "../../utils/Cars";

const Booking = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [selectedPickUpDate, setSelectedPickUpDate] = useState("");
  const [selectedDropOffDate, setSelectedDropOffDate] = useState("");
  return (
    <div
      className="mx-10 rounded-lg shadow-lg p-8 mt-24"
      style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="text-2xl font-bold mb-4">Book a Car</div>
      <div className="flex justify-between flex-wrap mb-4">
        <div>
          <div className="text-lg font-medium mb-1">
            Pick-up Location <span className="text-red-500">*</span>
          </div>
          <select className="border rounded-lg border-gray-300 text-gray-400 text-lg outline-none p-3">
            <option value="">Select pick up location</option>
            {locations.map((location, index) => {
              return (
                <option value={location} key={index}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
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
      </div>
      <div className="flex justify-end mt-7">
        <button className="bg-blue-500 text-lg text-white px-20 py-3 rounded-lg shadow-md hover:shadow-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default Booking;
