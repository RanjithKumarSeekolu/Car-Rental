import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCarStore from "../store/useCarStore";
import CarCard from "../features/cars/components/CarCard";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";

const CategoryCars = () => {
  const { id } = useParams();
  const { cars, loading, getAllCars } = useCarStore();

  useEffect(() => {
    getAllCars({ category: id });
  }, [id, getAllCars]);

  return (
    <div className="bg-[var(--bg)] min-h-screen pt-28 pb-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Category</p>
            <h1 className="text-3xl font-bold text-[var(--ink)] mt-1">{id}</h1>
          </div>
          <Link to="/allCars" className="text-[var(--accent)] font-semibold hover:underline">All cars</Link>
        </div>

        {loading ? (
          <Loader label="Loading cars..." />
        ) : cars.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-[var(--line)] rounded-[var(--radius)]">
            <p className="text-[var(--muted)] mb-6">No cars in this category yet.</p>
            <Link to="/allCars">
              <Button variant="accent">Browse all cars</Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CategoryCars;
