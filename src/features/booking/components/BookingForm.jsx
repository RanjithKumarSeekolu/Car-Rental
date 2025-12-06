import React, { useState, useEffect } from "react";
import { getLocations } from "../../../services/locations.services";
import useCarStore from "../../../store/useCarStore";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const BookingForm = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    // ... logic from original booking ... simplified state for overhaul demo
    // Ideally use react-hook-form here
    
    // For now, porting logic directly to keep functionality
    const [locations, setLocations] = useState([]);
    
    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

  return (
    <div className="pt-10 px-[5%]">
       <div className="rounded-lg w-full shadow-lg p-8 border-b-8 border-indigo-800 bg-white dark:bg-gray-900 transition-colors">
           <form className="flex flex-wrap gap-4 items-end">
               <div className="flex-1 min-w-[200px]">
                   <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300">Pick-up Location</label>
                   <select className="w-full p-3 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                       <option>Select Location</option>
                       {locations.map((loc, i) => <option key={i}>{loc.name}</option>)}
                   </select>
               </div>
               
               <div className="flex-1 min-w-[200px]">
                   <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300">Drop-off Location</label>
                   <select className="w-full p-3 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                       <option>Select Location</option>
                       {locations.map((loc, i) => <option key={i}>{loc.name}</option>)}
                   </select>
               </div>
               
               <div className="flex-1 min-w-[200px]">
                    <Input type="date" label="Pick-up Date" defaultValue={currentDate} />
               </div>
               
               <div className="flex-1 min-w-[200px]">
                    <Input type="date" label="Drop-off Date" defaultValue={currentDate} />
               </div>
               
               <div className="w-full md:w-auto">
                   <Button size="lg" className="w-full">Search</Button>
               </div>
           </form>
       </div>
    </div>
  );
};

export default BookingForm;
