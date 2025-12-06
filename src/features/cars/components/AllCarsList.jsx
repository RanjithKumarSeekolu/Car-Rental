import React, { useEffect, useState, useMemo } from "react";
import useCarStore from "../../../store/useCarStore";
import CarCard from "./CarCard";
import Loader from "../../../components/ui/Loader";
import Container from "../../../components/ui/Container";
import CarFiltersSidebar from "./CarFiltersSidebar";

const AllCarsList = () => {
    const { cars, loading, getAllCars } = useCarStore();
    
    // Filters State
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: 500,
        categories: [],
        transmissions: [],
        fuels: [],
        seats: []
    });

    useEffect(() => {
        getAllCars();
    }, [getAllCars]);
    
    // 1. Flatten and Augment Data
    // We inject stable mock attributes because the real API lacks them
    const allCars = useMemo(() => {
        if (!cars) return [];
        let flatCars = [];
        
        if (cars.length > 0 && cars[0].cars) {
            flatCars = cars.flatMap(cat => cat.cars || []);
        } else {
            flatCars = Array.isArray(cars) ? cars : [];
        }

        const categoriesList = ["Sedan", "SUV", "Luxury", "Hatchback", "Convertible", "Coupe", "Minivan", "Sports Car", "Truck"];

        return flatCars.map((car, index) => {
             // Deterministic mock data assignment based on index/id
             const idNum = (car._id || car.id || index).toString().charCodeAt(0) + index;
             // Mock price conversion to USD (approx) or just a random reasonable daily rate $50-$300
             const mockPrice = Math.floor((parseInt(car.price_per_day) || 2000) / 20) + 40; 

             return {
                 ...car,
                 id: car._id || car.id || `mock-car-${index}`,
                 // Overwrite/Add price for consistent USD filtering/display
                 price_per_day: mockPrice, 
                 original_price: car.price_per_day, // keep ref if needed
                 category: categoriesList[idNum % categoriesList.length],
                 transmission: idNum % 2 === 0 ? "Automatic" : "Manual",
                 fuel: ["Petrol", "Diesel", "Electric", "Hybrid"][idNum % 4],
                 seats: idNum % 3 === 0 ? "7+ seats" : (idNum % 5 === 0 ? "2-4 seats" : "5 seats")
             };
        });
    }, [cars]);


    // 2. Filter Logic
    const filteredCars = useMemo(() => {
        return allCars.filter(car => {
            // Search
            if (searchTerm) {
                const lowerTerm = searchTerm.toLowerCase();
                if (!car.make?.toLowerCase().includes(lowerTerm) && !car.model?.toLowerCase().includes(lowerTerm)) {
                    return false;
                }
            }

            // Price (compare against mock dollar price)
            if (parseFloat(car.price_per_day) > filters.priceRange) return false;

            // Categories
            if (filters.categories.length > 0 && !filters.categories.includes(car.category)) return false;

            // Transmission
            if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) return false;

            // Fuel
            if (filters.fuels.length > 0 && !filters.fuels.includes(car.fuel)) return false;

            // Seats
            if (filters.seats.length > 0 && !filters.seats.includes(car.seats)) return false;

            return true;
        });
    }, [allCars, searchTerm, filters]);


    const clearFilters = () => {
        setFilters({
            priceRange: 500,
            categories: [],
            transmissions: [],
            fuels: [],
            seats: []
        });
        setSearchTerm("");
        setIsFilterOpen(false); // Close drawer on reset on mobile
    };

    if (loading) return <Loader />;

    return (
        <Container className="py-12 bg-gray-50 min-h-screen">
             <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <CarFiltersSidebar 
                    filters={filters} 
                    setFilters={setFilters} 
                    clearFilters={clearFilters}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />

                {/* Main Content */}
                <div className="flex-1 pt-4">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Cars</h1>
                        <p className="text-gray-500 mb-6">Find the perfect car for your journey</p>
                        
                        {/* Wrapper for Search and Mobile Filter Button */}
                        <div className="flex gap-4">
                            {/* Search Input inline */}
                            <div className="relative max-w-md flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
                                    placeholder="Search by make or model..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Mobile Filter Trigger Button */}
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>
                                <span className="font-medium text-gray-700">Filters</span>
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 text-sm font-semibold text-gray-700">
                        Showing {filteredCars.length} cars
                    </div>

                    {filteredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCars.map(car => (
                                <CarCard key={car._id || car.id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <p className="text-xl text-gray-500 font-medium">No cars found matching your criteria.</p>
                            <button 
                                onClick={clearFilters}
                                className="mt-4 text-indigo-600 font-medium hover:underline"
                            >
                                Reset all filters
                            </button>
                        </div>
                    )}
                </div>
             </div>
        </Container>
    );
};

export default AllCarsList;
