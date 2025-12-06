import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCarStore from "../../../store/useCarStore";
import CarCard from "./CarCard";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";

const CarCollection = () => {
  const { cars, loading, fetchCars } = useCarStore();
  // Simplified category logic for now to ensure it works, reusing some logic from original
  // But ideally this should be cleaner. 
  
  // For this refactor, I'll fetch the cars using the store
  useEffect(() => {
    fetchCars(6);
  }, [fetchCars]);

  const [showCategoryCarsId, setShowCategoryCarsId] = useState(null); // Initialize to null or a default

  useEffect(() => {
    if (cars.length > 0 && showCategoryCarsId === null) {
      const sportsCategory = cars.find(category => category.name === "Sports");
      if (sportsCategory) {
        setShowCategoryCarsId(sportsCategory.id);
      } else {
        setShowCategoryCarsId(cars[0].id);
      }
    }
  }, [cars, showCategoryCarsId]);

  
  if (loading && cars.length === 0) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
           <span className="text-blue-800 font-semibold uppercase tracking-wider">Collection</span>
           <h2 className="text-4xl font-bold mt-2">Our Collection Cars</h2>
        </div>

        {/* Category Tabs (Simplified for brevity in overhaul, can be expanded) */}
        <div className="flex justify-center flex-wrap gap-4 mb-10 border-b border-gray-200 pb-4">
             {cars.map((category) => (
               <button 
                 key={category.id}
                 onClick={() => setShowCategoryCarsId(category.id)}
                 className={`px-4 py-2 rounded-full transition-all ${showCategoryCarsId === category.id ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
               >
                 {category.name}
               </button>
             ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((category) => {
                if (category.id === showCategoryCarsId) {
                    return category.cars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ));
                }
                return null;
            })}
        </div>

        {/* <div className="flex justify-end mt-12">
            <Link to="/allCars">
                <Button variant="primary" size="lg">
                    See all cars
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Button>
            </Link>
        </div> */}
      </Container>
    </div>
  );
};

export default CarCollection;
