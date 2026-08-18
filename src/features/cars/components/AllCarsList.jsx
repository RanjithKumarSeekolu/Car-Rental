import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useCarStore from "../../../store/useCarStore";
import CarCard from "./CarCard";
import Loader from "../../../components/ui/Loader";
import Container from "../../../components/ui/Container";
import CarFiltersSidebar from "./CarFiltersSidebar";

const AllCarsList = () => {
  const [searchParams] = useSearchParams();
  const cityIdParam = searchParams.get("cityId") || "";
  const cityParam = searchParams.get("city") || "";
  const fromParam = searchParams.get("from") || "";
  const toParam = searchParams.get("to") || "";

  const { cars, loading, getAllCars } = useCarStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 20000,
    categories: [],
    transmissions: [],
    fuels: [],
    seats: [],
  });

  useEffect(() => {
    const params = {};
    if (cityIdParam) params.cityId = cityIdParam;
    else if (cityParam) params.city = cityParam;
    getAllCars(params);
  }, [getAllCars, cityIdParam, cityParam]);

  const allCars = useMemo(() => (Array.isArray(cars) ? cars : []), [cars]);

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (!car.make?.toLowerCase().includes(q) && !car.model?.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (parseFloat(car.price_per_day) > filters.priceRange) return false;
      if (filters.categories.length && !filters.categories.includes(car.category)) return false;
      if (filters.transmissions.length && !filters.transmissions.includes(car.transmission)) return false;
      if (filters.fuels.length && !filters.fuels.includes(car.fuel)) return false;
      return true;
    });
  }, [allCars, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({ priceRange: 20000, categories: [], transmissions: [], fuels: [], seats: [] });
    setSearchTerm("");
    setIsFilterOpen(false);
  };

  const cityLabel = cityParam || (cityIdParam
    ? cityIdParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "");

  if (loading) return <Loader label="Loading cars..." />;

  return (
    <Container className="py-12 bg-[var(--bg)] min-h-screen pt-28">
      <div className="flex flex-col lg:flex-row gap-8">
        <CarFiltersSidebar
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[var(--ink)] mb-2">
            {cityLabel ? `Cars in ${cityLabel}` : "Browse cars"}
          </h1>
          <p className="text-[var(--muted)] mb-2">
            {fromParam && toParam
              ? `${fromParam} → ${toParam}`
              : "Find the perfect car for your journey"}
          </p>
          {(cityIdParam || cityParam) && (
            <Link to="/allCars" className="text-sm font-semibold text-[var(--accent)] hover:underline mb-4 inline-block">
              Clear location filter
            </Link>
          )}

          <div className="flex gap-4 mb-6 mt-4">
            <input
              type="text"
              className="block w-full max-w-md px-4 py-3 border border-[var(--line)] rounded-xl bg-[var(--surface)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] font-medium"
            >
              Filters
            </button>
          </div>

          <div className="mb-4 text-sm font-semibold text-[var(--ink)]">
            Showing {filteredCars.length} cars
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[var(--line)] rounded-xl bg-[var(--surface)]">
              <p className="text-[var(--muted)] mb-4">No cars found matching your criteria.</p>
              <button onClick={clearFilters} className="text-[var(--accent)] font-semibold hover:underline">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllCarsList;
