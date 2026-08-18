import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCarStore from "../../../store/useCarStore";
import CarCard, { CarCardSkeleton } from "./CarCard";

const categories = [
  "Sports",
  "SUV",
  "Sedan",
  "Luxury",
  "Convertible",
  "Electric",
  "Hatchback",
  "Minivan",
];

const CarCollection = () => {
  const { collectionCars, loading, fetchCars } = useCarStore();
  const [category, setCategory] = useState("Sports");

  useEffect(() => {
    fetchCars({ limit: 6, category });
  }, [fetchCars, category]);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      for (const name of categories) {
        if (cancelled) return;
        await fetchCars({ limit: 6, category: name, prefetch: true });
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchCars]);

  return (
    <section className="py-20 md:py-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
            Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-tight">
            Our featured cars
          </h2>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12" role="tablist" aria-label="Car categories">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={category === name}
              onMouseEnter={() => fetchCars({ limit: 6, category: name, prefetch: true })}
              onFocus={() => fetchCars({ limit: 6, category: name, prefetch: true })}
              onClick={() => setCategory(name)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                category === name
                  ? "btn-navy"
                  : "bg-[var(--surface)] !text-[var(--ink)] border border-[var(--line)] hover:border-[var(--navy)]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          aria-busy={loading}
        >
          {loading ? (
            Array.from({ length: 6 }, (_, i) => <CarCardSkeleton key={i} />)
          ) : collectionCars.length > 0 ? (
            collectionCars.map((car) => (
              <CarCard key={car.id} car={car} animate={false} />
            ))
          ) : (
            <p className="col-span-full text-center text-[var(--muted)]">
              No cars found for this category.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/allCars"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-[var(--radius-sm)] border border-[var(--navy)] !text-[var(--navy)] dark:border-[var(--accent)] dark:!text-[var(--accent)] font-semibold hover:bg-[var(--navy)] hover:!text-[var(--on-navy)] dark:hover:bg-[var(--accent)] dark:hover:!text-[var(--accent-text)] transition"
          >
            See all cars →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarCollection;
