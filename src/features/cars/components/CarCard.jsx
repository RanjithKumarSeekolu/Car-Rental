import React from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { formatPrice } from "../../../utils/format";

const cardClass =
  "bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-[var(--shadow)] overflow-hidden group flex flex-col h-full";

export const CarCardSkeleton = () => (
  <div className={cardClass} aria-hidden>
    <div className="h-52 bg-[var(--bg)] animate-pulse" />
    <div className="p-5 flex flex-col flex-grow gap-3">
      <div className="h-5 w-2/3 rounded bg-[var(--bg)] animate-pulse" />
      <div className="h-4 w-1/3 rounded bg-[var(--bg)] animate-pulse" />
      <div className="flex gap-2 mt-1">
        <div className="h-6 w-16 rounded-md bg-[var(--bg)] animate-pulse" />
        <div className="h-6 w-20 rounded-md bg-[var(--bg)] animate-pulse" />
        <div className="h-6 w-14 rounded-md bg-[var(--bg)] animate-pulse" />
      </div>
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-[var(--line)]">
        <div className="h-7 w-24 rounded bg-[var(--bg)] animate-pulse" />
        <div className="h-10 w-24 rounded-[var(--radius-sm)] bg-[var(--bg)] animate-pulse" />
      </div>
    </div>
  </div>
);

const CarCard = ({ car, animate = true }) => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const bookingQs = new URLSearchParams();
  if (from) bookingQs.set("from", from);
  if (to) bookingQs.set("to", to);
  const bookingHref = `/booking/${car.id}${bookingQs.toString() ? `?${bookingQs}` : ""}`;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true } : undefined}
      transition={animate ? { duration: 0.4 } : undefined}
      whileHover={{ y: -4 }}
      className={cardClass}
    >
      <div className="relative h-52 overflow-hidden bg-[var(--bg)]">
        {car.image_url ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-[var(--muted)]">
            No photo
          </div>
        )}
        {car.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[var(--surface)]/95 text-[var(--navy)] shadow-sm">
            {car.category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-3 mb-1">
          <h3 className="font-bold text-lg text-[var(--ink)] leading-tight">
            {car.make} {car.model}
          </h3>
          <span className="shrink-0 text-xs font-bold text-[var(--success)] bg-[var(--bg)] px-2 py-1 rounded-md">
            {car.rating || 4.5}★
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] mb-4">
          {car.address || car.city || "India"}
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--muted)] mb-5">
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg)]">
            {String(car.seats).includes('seat') ? car.seats : `${car.seats} seats`}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg)]">{car.transmission}</span>
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg)]">{car.fuel}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)] mt-auto">
          <div>
            <span className="text-xl font-bold text-[var(--ink)]">{formatPrice(car.price_per_day)}</span>
            <span className="text-sm text-[var(--muted)]">/day</span>
          </div>
          <Link
            to={bookingHref}
            state={{ car }}
            className="btn-accent px-5 py-2.5 text-sm font-bold rounded-[var(--radius-sm)] transition"
          >
            Rent now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
