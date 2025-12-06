import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

const CarCard = ({ car }) => {
  // Mock Data Generators for demo look
  const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
  const reviews = Math.floor(Math.random() * 200) + 50;
  const isAuto = Math.random() > 0.5;
  const fuel = Math.random() > 0.5 ? "Petrol" : "Diesel";
  const seats = Math.random() > 0.8 ? 7 : 5;

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
            Recommended
        </div>
        <div className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white text-gray-700 hover:text-red-500 cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{car.make} {car.model}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{car.location || "Mumbai, Maharashtra"}</p>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded text-xs font-bold text-green-700 dark:text-green-400">
                    <span>{rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-xs text-gray-400 mt-1">({reviews} reviews)</span>
            </div>
        </div>

        <div className="flex items-center gap-4 my-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {seats}
            </div>
            <div className="flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isAuto ? 'Automatic' : 'Manual'}
            </div>
            <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
                </svg>
                {fuel}
            </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${car.mockPrice || car.price_per_day || 50}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/day</span>
            </div>
            <Link 
                to={`/booking/${car._id || car.id}`}
                state={{ car: { ...car, price_per_day: car.mockPrice || car.price_per_day || 50 } }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all hover:shadow-md active:scale-95"
            >
                Rent Now
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
